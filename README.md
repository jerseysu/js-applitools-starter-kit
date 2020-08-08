# js-applitools-starter-kit
> Applitools starter kit

[![Build Status](https://travis-ci.com/jerseysu/js-applitools-starter-kit.svg?branch=master)](https://travis-ci.com/jerseysu/js-applitools-starter-kit)

### Install Env
```sh
# Docker Image
$ docker pull selenium/standalone-chrome
# Install npm package
$ npm install --save
```
* Note: wdio version : 6.4.0

### Run first visual test

```sh
# Export Applitools key
$ export APPLITOOLS_API_KEY=
# Execute test
$ npm run test:visual -- --spec test/specs/visual.js
```

* Note: To obtain your key see [How to obtain your API key.](https://applitools.com/docs/topics/overview/obtain-api-key.html)
