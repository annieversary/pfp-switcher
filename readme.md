# pfp switcher

this is a small thing that will change your profile picture according to sunrise and sunset, within 20 minutes

only supports pleroma and twitter

## running

clone the repo

run `npm i`

create a `.env` file, and add the following:

```
DAY_IMG="path/to/day/image.png"
NIGHT_IMG="path/to/night/image.png"

# your current position
LAT="LATITUDE HERE"
LONG="LONGITUDE HERE"

PLEROMA_INSTANCE="" # eg: https://example.com
PLEROMA_COOKIE="" # you can get this with the devtools

# twitter details for an app with 1.1 access
TWITTER_API_KEY=""
TWITTER_API_SECRET=""
TWITTER_API_TOKEN=""
TWITTER_API_TOKEN_SECRET=""
```

set a cronjob like following:

```
0,20,40 * * * * cd /path/to/folder && node run.js
```

and that should be it!
