'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {
  ClassicRunner,
  Eyes,
  Target,
} = require('@applitools/eyes-webdriverio');
const {Configuration} = require('@applitools/eyes-selenium');

const buildNumber = process.env.TRAVIS_JOB_NUMBER || 'local';

let browser; let eyes;

describe('wdio6', function() {
  before(async () => {
    await chromedriver.start();
  });

  beforeEach(async () => {
    const chrome = {
      capabilities: {
        browserName: 'chrome',
      },
    };

    const configuration = await new Configuration()
        .setApiKey(process.env.APPLITOOLS_API_KEY)
        .setAppName('Demo App')
        .setTestName(`Smoke Test #${buildNumber}`);

    const runner = await new ClassicRunner();
    eyes = await new Eyes(runner);
    await eyes.setConfiguration(configuration);

    browser = await remote(chrome);
  });

  afterEach(async () => {
    await browser.deleteSession();
    await eyes.abortIfNotClosed();

    const results = await eyes.getRunner().getAllTestResults(false);
    console.log(results);
    console.log(results.getAllResults());
  });

  after(async () => {
    await chromedriver.stop();
  });

  it('Classic Runner Test', async () => {
    await eyes.open(browser);

    await browser.url('https://demo.applitools.com');

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.url("https://demo.applitools.com/index_v2.html");

    // Visual checkpoint #1.
    await eyes.check('Login Window', Target.window().fully());

    // Click the "Log in" button.
    // await driver.click(By.id('log-in'));
    const loginButton = await browser.$('#log-in');
    await loginButton.click();

    // Visual checkpoint #2.
    await eyes.check('App Window', Target.window().fully());

    await eyes.closeAsync();
  });
});
