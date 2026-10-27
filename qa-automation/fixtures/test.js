const { test: base, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/login.page');
const { ClaimPage } = require('../pages/claim.page');
const { AdminClaimsPage } = require('../pages/admin-claims.page');

const test = base.extend({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  claimPage: async ({ page }, use) => use(new ClaimPage(page)),
  adminClaimsPage: async ({ page }, use) => use(new AdminClaimsPage(page)),
});

module.exports = { test, expect };
