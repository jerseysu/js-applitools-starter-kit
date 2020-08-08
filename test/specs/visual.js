'use strict';

const chromedriver = require('chromedriver');
const {remote} = require('webdriverio');
const {
  ClassicRunner,
  ConsoleLogHandler,
  // DeviceName,
  Eyes,
  FileLogHandler,
  // ScreenOrientation,
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
        // .addDeviceEmulation(DeviceName.iPhone_X, ScreenOrientation.PORTRAIT)
        .setApiKey(process.env.APPLITOOLS_API_KEY)
        .setAppName('Demo App')
        .setTestName(`Smoke Test #${buildNumber}`)
        .setViewportSize({width: 1024, height: 768});

    const runner = await new ClassicRunner();
    eyes = await new Eyes(runner);
    await eyes.setConfiguration(configuration);
    await eyes.setLogHandler(new ConsoleLogHandler(true));
    await eyes.setLogHandler(new FileLogHandler(true, 'test/logs/eyes.log', false));

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

  it('Test - Basic Check', async () => {
    await eyes.open(browser);

    await browser.url('https://demo.applitools.com');

    // To see visual bugs after the first run, use the commented line below instead.
    // await driver.url('https://demo.applitools.com/index_v2.html');

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

  it('Test - Baidu', async () => {
    await eyes.open(browser);
    await browser.url('https://www.baidu.com');

    // Visual checkpoint #1.
    await eyes.check('Baidu', Target.window().fully());

    await eyes.closeAsync();
  });
});
