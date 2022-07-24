# pfp-switcher

this is a small thing that will change your profile picture according to sunrise and sunset, within 30 minutes of it happening

## running

clone the repo

add `day.png` and `night.png` images

run `npm i`

create a `.env` file, and add the following:

```
INSTANCE="YOUR INSTANCE URL HERE" # eg: https://example.com
COOKIE="YOUR PLEROMA COOKIE HERE" # you can get this with the devtools
# your current position
LAT="LATITUDE HERE"
LONG="LONGITUDE HERE"
```

set a cronjob like following:

```
0,20,40 * * * * cd /path/to/folder & node run.js
```

and that should be it!