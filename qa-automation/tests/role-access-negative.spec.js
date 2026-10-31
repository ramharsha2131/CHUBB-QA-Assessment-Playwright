const { test, expect } = require('../fixtures/test');
const { users } = require('../data/users');
const { createClaimData } = require('../data/claims');

test.describe('Role-based UI access', () => {
  test('CLAIMANT-NEG-01: claimant cannot open admin claims management directly', async ({ loginPage, page }) => {
    await loginPage.open();
    await loginPage.submit(users.claimant.email, users.claimant.password);
    await expect(page).toHaveURL(/\/claims(?:\?|$)/, { timeout: 20_000 });

    await page.goto('/admin/claims');

    await expect(page).toHaveURL(/\/claims(?:\?|$)/, { timeout: 20_000 });
    await expect(page.getByRole('heading', { name: 'My Claims' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Claims Management' })).toHaveCount(0);
    await expect(page.getByRole('combobox', { name: 'Filter claims by status' })).toHaveCount(0);
    await expect(page.getByRole('button', { name: 'Users', exact: true })).toHaveCount(0);
  });

  test('ADMIN-NEG-01: admin cannot move an approved claim back to an earlier status', async ({
    loginPage, page, claimPage, adminClaimsPage,
  }) => {
    const claimData = createClaimData();

    // Create a unique record through the claimant UI so the admin check is isolated.
    await loginPage.open();
    await loginPage.submit(users.claimant.email, users.claimant.password);
    await expect(page).toHaveURL(/\/claims(?:\?|$)/, { timeout: 20_000 });
    await claimPage.openNewClaim();
    await claimPage.enterIncidentDetails(claimData);
    await claimPage.enterSupportingDetails(claimData.description);
    await claimPage.verifyReviewDetails(claimData);
    await claimPage.submitClaim();
    const claimId = await claimPage.getSubmittedClaimId(claimData.description);
    await claimPage.logout();

    // Approve the claim as admin, then inspect the UI's remaining transition choices.
    await loginPage.open();
    await loginPage.submit(users.admin.email, users.admin.password);
    await expect(page).toHaveURL(/\/admin\/dashboard(?:\?|$)/, { timeout: 20_000 });
    await adminClaimsPage.openClaimsManagement();
    await adminClaimsPage.filterByStatus('Submitted');
    await expect(adminClaimsPage.claimRow(claimId)).toBeVisible();
    await adminClaimsPage.changeClaimStatus(claimId, 'Under Review');
    await adminClaimsPage.filterByStatus('Under Review');
    await adminClaimsPage.changeClaimStatus(claimId, 'Approved');

    const statusOptions = adminClaimsPage.claimRow(claimId)
      .getByTestId(`status-select-${claimId.slice(0, 8)}`)
      .getByRole('option');
    await expect(statusOptions).toHaveText(['Update Status', 'Closed']);
    await expect(statusOptions.getByText('Submitted')).toHaveCount(0);
    await expect(statusOptions.getByText('Under Review')).toHaveCount(0);
    await expect(statusOptions.getByText('Rejected')).toHaveCount(0);
  });
});