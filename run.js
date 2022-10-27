const fs = require('fs');
const FormData = require("form-data");
const axios = require("axios");
const moment = require("moment");
const TwitterClient = require("twitter-api-client").TwitterClient;

require('dotenv').config();

const pleroma_instance = process.env.PLEROMA_INSTANCE;
const pleroma_cookie = process.env.PLEROMA_COOKIE;

const twitter = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_API_TOKEN,
    accessTokenSecret: process.env.TWITTER_API_TOKEN_SECRET,
});

const lat = process.env.LAT;
const long = process.env.LONG;

function change(img) {
    const avatar = fs.createReadStream(img);

    // PLEROMA

    const form = new FormData();
    form.append("avatar", avatar);

    const options = {
        method: "PATCH",
        url: `${pleroma_instance}/api/v1/accounts/update_credentials`,
        port: 443,
        headers: {
            Cookie: pleroma_cookie,
            ...form.getHeaders(),
        },
        data: form
    };

    axios(options)
        .then(res => {
            console.log(`pleroma statusCode: ${res.status}`);
        })
        .catch(error => {
            console.error(error);
        });

    // TWITTER

    const image = fs.readFileSync(img, {encoding: 'base64'});
    twitter.accountsAndUsers.accountUpdateProfileImage({
        image,
    })
        .then(res => {
            console.log(`twitter response: ${res}`);
        })
        .catch(error => {
            console.error("fucked up", error);
        });
}

async function main() {
    const d = await axios.get(`http://api.sunrise-sunset.org/json?lat=${lat}&lng=${long}&formatted=0&date=today`);

    if (d.data.status != 'OK') {
        return;
    }

    let time = moment(),
        sunrise = moment(d.data.results.sunrise),
        sunset = moment(d.data.results.sunset);

    if (sunrise < time && time < sunrise.add(21, 'minutes')) {
        console.log('changing to day pic');
        change(process.env.DAY_IMG);
    }

    if (sunset < time && time < sunset.add(21, 'minutes')) {
        console.log('changing to night pic');
        change(process.env.NIGHT_IMG);
    }
}

main();
