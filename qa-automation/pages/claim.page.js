const { expect } = require('@playwright/test');

class ClaimPage {
  constructor(page) {
    this.page = page;
  }

  async openNewClaim() {
    // Start the claim wizard from the claimant's claims page.
    await this.page.getByRole('button', { name: 'Submit Claim', exact: true }).click();
    await expect(this.page).toHaveURL(/\/claims\/new(?:\?.*)?$/);
    await expect(this.page.getByTestId('wizard-step-1')).toBeVisible();
  }

  async enterIncidentDetails(claimData) {
    // Complete wizard step 1 and advance only after the form accepts the details.
    const step = this.page.getByTestId('wizard-step-1');
    await step.getByLabel(/When did the incident occur/).fill(claimData.incidentDate);
    await step.getByLabel(/Where did the incident occur/).fill(claimData.location);
    await step.getByLabel('Claim Amount').fill(claimData.amount);
    await step.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(this.page.getByTestId('wizard-step-2')).toBeVisible();
  }

  async enterSupportingDetails(description) {
    // Add the incident description in step 2 and move to the review screen.
    const step = this.page.getByTestId('wizard-step-2');
    await step.getByLabel('Describe what happened').fill(description);
    await step.getByRole('button', { name: 'Next', exact: true }).click();
    await expect(this.page.getByTestId('wizard-step-3')).toBeVisible();
  }

  async verifyReviewDetails({ incidentDateText, location, formattedAmount, description }) {
    // Confirm the review screen shows the same values entered in the wizard.
    const step = this.page.getByTestId('wizard-step-3');
    await expect(step.getByRole('heading', { name: 'Review Your Claim' })).toBeVisible();
    await expect(step.getByText(incidentDateText, { exact: true })).toBeVisible();
    await expect(step.getByText(location, { exact: true })).toBeVisible();
    await expect(step.getByText(formattedAmount, { exact: true })).toBeVisible();
    await expect(step.getByText(description, { exact: true })).toBeVisible();
  }

  async submitClaim() {
    // Submit from the review step and wait for the claimant's claims list.
    const reviewStep = this.page.getByTestId('wizard-step-3');
    await reviewStep.getByRole('button', { name: 'Submit Claim', exact: true }).click();
    await expect(this.page).toHaveURL(/\/claims(?:\?.*)?$/, { timeout: 20_000 });
    await expect(this.page.getByRole('heading', { name: 'My Claims' })).toBeVisible();
  }

  async getSubmittedClaimId(description) {
    // Find this run's claim by its unique description and return the displayed ID.
    await expect(this.page.getByRole('heading', { name: 'My Claims' })).toBeVisible();
    const row = this.page.getByRole('row').filter({ hasText: description }).first();
    await expect(row).toBeVisible({ timeout: 15_000 });
    const visibleId = (await row.getByRole('cell').first().locator('code').innerText()).trim();
    expect(visibleId).toMatch(/^[a-f0-9]{8}$/i);
    return visibleId;
  }

  async logout() {
    // End the current user's session before switching roles in an E2E flow.
    await this.page.getByRole('button', { name: /^logout$/i }).click();
    await expect(this.page).toHaveURL(/\/login(?:\?.*)?$/, { timeout: 15_000 });
  }
}

module.exports = { ClaimPage };
