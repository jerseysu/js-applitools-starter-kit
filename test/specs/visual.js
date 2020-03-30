'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {
  ClassicRunner,
  Eyes,
  Target,
} = require('@applitools/eyes-webdriverio');
const {Configuration} = require('@applitools/eyes-selenium');

let browser;
let eyes;

describe('wdio5', function() {
  before(async function() {
    chromedriver.start();
  });

  beforeEach(async () => {
    const chrome = {
      capabilities: {
        browserName: 'chrome',
      },
    };
    browser = await remote(chrome);
  });

  afterEach(async () => {
    await browser.deleteSession();
    await eyes.abortIfNotClosed();

    const results = await eyes.getRunner().getAllTestResults(false);
    console.log(results);
    console.log(results.getAllResults());
  });

  after(async function() {
    chromedriver.stop();
  });

  it('Classic Runner Test', async () => {
    await browser.url('https://demo.applitools.com');

    const runner = new ClassicRunner();

    eyes = new Eyes(runner);
    eyes.setApiKey(process.env.APPLITOOLS_API_KEY);

    const configuration = new Configuration();
    configuration.setAppName('Demo App');
    configuration.setTestName('Smoke Test');

    eyes.setConfiguration(configuration);
    await eyes.open(browser);

    await browser.url('https://demo.applitools.com');

    // Visual checkpoint #1.
    await eyes.check('Login Window', Target.window());

    // Click the "Log in" button.
    // await driver.click(By.id('log-in'));
    const loginButton = await browser.$('#log-in');
    await loginButton.click();

    // Visual checkpoint #2.
    await eyes.check('App Window', Target.window());

    await eyes.closeAsync();
  });
});
