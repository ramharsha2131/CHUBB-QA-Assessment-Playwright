const { test, expect } = require('../fixtures/test');
const { users } = require('../data/users');

test.describe('Authentication and authorization', () => {
  // Check that a user can reach and identify the login form.
  test('@smoke AUTH-01: login form is accessible', async ({ loginPage, page }) => {
    await loginPage.open();
    await expect(page.getByRole('heading', { name: 'Log In' })).toBeVisible();
  });

  // Invalid credentials should show an error and keep the user on login.
  test('AUTH-02: invalid credentials show an error and do not navigate to claims', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(users.claimant.email, 'IncorrectPassword-qa');
    await expect(page.getByText('Invalid email or password', { exact: true })).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  // A claimant should land on their own claims page after signing in.
  test('@smoke AUTH-03: claimant can log in and access claims', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(users.claimant.email, users.claimant.password);
    await expect(page).toHaveURL(/\/claims(?:\?|$)/, { timeout: 20_000 });
  });

  // An admin should be routed to the admin dashboard instead.
  test('AUTH-04: admin is routed to admin dashboard', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(users.admin.email, users.admin.password);
    await expect(page).toHaveURL(/\/admin\/dashboard(?:\?|$)/, { timeout: 20_000 });
  });
});
