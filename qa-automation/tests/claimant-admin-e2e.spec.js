const { test, expect } = require('../fixtures/test');
const { users } = require('../data/users');
const { createClaimData } = require('../data/claims');

test('E2E-CLAIM-ADMIN-01: claimant submits a claim and admin reviews then approves it', async ({
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
  console.log(`Newly submitted claim ID: ${claimId}`);
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
