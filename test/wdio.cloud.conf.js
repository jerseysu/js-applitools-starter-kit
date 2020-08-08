exports.config = {
  user: process.env.BROWSERSTACK_USERNAME || 'BROWSERSTACK_USERNAME',
  key: process.env.BROWSERSTACK_ACCESS_KEY || 'BROWSERSTACK_ACC_KEY',

  updateJob: false,
  specs: [
    './test/specs/**/*.js',
  ],

  services: [
    ['browserstack', {
      browserstackLocal: true,
    }],
  ],

  capabilities: [{
    browser: 'chrome',
    name: 'multiple_test',
    build: 'webdriver-browserstack',
  }],

  logLevel: 'debug',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  baseUrl: '',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  host: 'hub.browserstack.com',

  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
  },
};
