'use strict';
const assert = require('assert');

describe('applitools page', () => {
  it('should have the right title', async () => {
    await browser.url('https://demo.applitools.com');
    const title = await browser.getTitle();

    assert.strictEqual(title, 'ACME demo app');
  });
});
