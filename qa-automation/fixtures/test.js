const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');

// Shared fixture: each test receives a ready-to-use LoginPage object.
const test = base.extend({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

module.exports = { test, expect };
