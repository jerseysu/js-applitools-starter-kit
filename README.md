# js-applitools-starter-kit
> Applitools starter kit

[![Build Status](https://travis-ci.com/jerseysu/js-applitools-starter-kit.svg?branch=master)](https://travis-ci.com/jerseysu/js-applitools-starter-kit)

### Install Env
```sh
# Docker Image
$ docker pull selenium/standalone-chrome:3.141.59-20200826
# Install npm package
$ npm install --save

# Run Docker Image in another terminal
$ docker run -d -p 4444:4444 -v /dev/shm:/dev/shm selenium/standalone-chrome:3.141.59-20200826
```
#### Note:
- wdio version : 7.3.0
- Selenium Version: 3.141.59-20200826

### Run first visual test
```sh
# Export Applitools key
$ export APPLITOOLS_API_KEY=
# Execute test
$ npm run test:visual -- --spec test/specs/visual.js
```

* Note: To obtain your key see [How to obtain your API key.](https://applitools.com/docs/topics/overview/obtain-api-key.html)
