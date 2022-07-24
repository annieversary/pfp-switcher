const fs = require('fs');
const FormData = require("form-data");
const axios = require("axios");
const moment = require("moment");

require('dotenv').config();

const instance = process.env.INSTANCE;
const cookie = process.env.COOKIE;
const lat = process.env.LAT;
const long = process.env.LONG;

function change(img) {
    const avatar = fs.createReadStream(img);
    const form = new FormData();
    form.append("avatar", avatar);

    const options = {
        method: "PATCH",
        url: `${instance}/api/v1/accounts/update_credentials`,
        port: 443,
        headers: {
            Cookie: cookie,
            ...form.getHeaders(),
        },
        data: form
    };

    axios(options)
        .then(res => {
            console.log(`statusCode: ${res.status}`);
        })
        .catch(error => {
            console.error(error);
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

    sunset = moment().add(-5, 'minutes');

    if (sunrise < time && time < sunrise.add(21, 'minutes')) {
        console.log('changing to day pic');
        change("./day.png");
    }

    if (sunset < time && time < sunset.add(21, 'minutes')) {
        console.log('changing to night pic');
        change("./night.png");
    }
}

main();
