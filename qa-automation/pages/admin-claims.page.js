const { expect } = require('@playwright/test');

class AdminClaimsPage {
  constructor(page) {
    this.page = page;
  }

  async openClaimsManagement() {
    // Navigate from the admin dashboard and wait for the initial claims API call.
    await expect(this.page).toHaveURL(/\/admin\/dashboard(?:\?.*)?$/);
    const claimsResponse = this.waitForClaimsResponse();
    await this.page.getByRole('button', { name: 'Claims', exact: true }).click();
    await expect(this.page).toHaveURL(/\/admin\/claims(?:\?.*)?$/);
    await expect(this.page.getByRole('heading', { name: 'Claims Management' })).toBeVisible();
    await this.waitForClaimsToLoad(claimsResponse);
  }

  waitForClaimsResponse(status) {
    // Match the selected filter so another in-flight list refresh cannot satisfy this wait.
    return this.page.waitForResponse((response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname.endsWith('/api/admin/claims') &&
      (status === undefined || (new URL(response.url()).searchParams.get('status') || '') === status)
    );
  }

  async waitForClaimsToLoad(responsePromise) {
    // Check the API result and wait until the page has finished its loading state.
    const response = await responsePromise;
    if (!response.ok()) {
      throw new Error(`Failed to load admin claims (HTTP ${response.status()})`);
    }

    await expect(this.page.getByRole('status', { name: 'Loading claims' }))
      .toBeHidden({ timeout: 20_000 });
  }

  get statusFilter() {
    return this.page.getByRole('combobox', { name: 'Filter claims by status' });
  }

  async filterByStatus(status) {
    // Convert the visible label to the API enum, select it, and wait for that result.
    const value = status === 'All Statuses' ? '' : status.toUpperCase().replace(/ /g, '_');
    const claimsResponse = this.waitForClaimsResponse(value);
    await this.statusFilter.selectOption(value);
    await expect(this.statusFilter).toHaveValue(value);
    await this.waitForClaimsToLoad(claimsResponse);
  }

  claimRow(claimId) {
    // Rows use the first eight ID characters in their status control's test ID.
    return this.page.getByRole('row').filter({
      has: this.page.getByTestId(`status-select-${claimId.slice(0, 8)}`),
    });
  }

  async changeClaimStatus(claimId, status) {
    // Validate the transition, confirm it in the dialog, then wait for the server update.
    const row = this.claimRow(claimId);
    await expect(row).toBeVisible({ timeout: 15_000 });
    const statusDropdown = row.getByTestId(`status-select-${claimId.slice(0, 8)}`);
    const availableOptions = await statusDropdown.locator('option').allTextContents();

    if (!availableOptions.includes(status)) {
      throw new Error(
        `Claim ${claimId} cannot transition to "${status}". Available options: ${availableOptions.join(', ')}`
      );
    }

    await statusDropdown.selectOption({ label: status });
    const dialog = this.page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Confirm Status Change' })).toBeVisible();
    await expect(dialog).toContainText(`Change status to ${status}?`);
    const statusUpdateResponse = this.page.waitForResponse((response) => {
      const request = response.request();
      return request.method() === 'PATCH' &&
        new URL(response.url()).pathname.endsWith('/status') &&
        request.postDataJSON()?.newStatus === status.toUpperCase().replace(/ /g, '_');
    });
    await dialog.getByRole('button', { name: 'Confirm', exact: true }).click();
    const response = await statusUpdateResponse;
    if (!response.ok()) {
      throw new Error(`Failed to update claim status (HTTP ${response.status()})`);
    }
    await expect(dialog).toBeHidden();
    await expect(row).toContainText(status, { timeout: 15_000 });
  }

  async logout() {
    // Sign out the admin after completing the workflow.
    await this.page.getByRole('button', { name: /^logout$/i }).click();
    await expect(this.page).toHaveURL(/\/login(?:\?.*)?$/, { timeout: 15_000 });
  }
}

module.exports = { AdminClaimsPage };
