const { test, expect } = require('../fixtures/test');
const { users } = require('../data/users');
const { createClaimData } = require('../data/claims');

// Create a fresh Submitted claim within this test so it does not depend on
// leftover database state or a hardcoded ID from a previous test run.
test('ADMIN-01: Admin reviews and approves a newly submitted claim', async ({
  page, loginPage, claimPage, adminClaimsPage,
}) => {
  const claimData = createClaimData();

  await loginPage.open();
  await loginPage.submit(users.claimant.email, users.claimant.password);
  await expect(page).toHaveURL(/\/claims(?:\?.*)?$/, { timeout: 20_000 });
  await claimPage.openNewClaim();
  await claimPage.enterIncidentDetails(claimData);
  await claimPage.enterSupportingDetails(claimData.description);
  await claimPage.verifyReviewDetails(claimData);
  await claimPage.submitClaim();
  const claimId = await claimPage.getSubmittedClaimId(claimData.description);
  console.log(`Claim selected for admin review: ${claimId}`);
  await claimPage.logout();

  await loginPage.open();
  await loginPage.submit(users.admin.email, users.admin.password);
  await expect(page).toHaveURL(/\/admin\/dashboard(?:\?.*)?$/, { timeout: 20_000 });
  await adminClaimsPage.openClaimsManagement();
  await adminClaimsPage.filterByStatus('Submitted');
  await expect(adminClaimsPage.claimRow(claimId)).toBeVisible();
  await adminClaimsPage.changeClaimStatus(claimId, 'Under Review');
  await adminClaimsPage.filterByStatus('Under Review');
  await expect(adminClaimsPage.claimRow(claimId)).toBeVisible();
  await adminClaimsPage.changeClaimStatus(claimId, 'Approved');
  await expect(adminClaimsPage.claimRow(claimId)).toContainText('Approved');
  await adminClaimsPage.logout();
});
