const { test, expect } = require('../fixtures/test');
const { users } = require('../data/users');

test.describe('Claim submission validation', () => {
  test('CLAIM-01: required incident details prevent advancing with an empty form', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(users.claimant.email, users.claimant.password);
    await expect(page).toHaveURL(/\/claims(?:\?|$)/, { timeout: 20_000 });
    await page.goto('/claims/new');
    const firstStep = page.getByTestId('wizard-step-1');
    await expect(firstStep).toBeVisible();
    await expect(firstStep.getByRole('button', { name: /next/i })).toBeDisabled();
  });
});
