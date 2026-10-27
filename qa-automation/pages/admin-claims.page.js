const { expect } = require('@playwright/test');

class AdminClaimsPage {
  constructor(page) {
    this.page = page;
  }

  async openClaimsManagement() {
    await expect(this.page).toHaveURL(/\/admin\/dashboard(?:\?.*)?$/);
    const claimsResponse = this.waitForClaimsResponse();
    await this.page.getByRole('button', { name: 'Claims', exact: true }).click();
    await expect(this.page).toHaveURL(/\/admin\/claims(?:\?.*)?$/);
    await expect(this.page.getByRole('heading', { name: 'Claims Management' })).toBeVisible();
    await this.waitForClaimsToLoad(claimsResponse);
  }

  waitForClaimsResponse() {
    return this.page.waitForResponse((response) =>
      response.request().method() === 'GET' &&
      new URL(response.url()).pathname.endsWith('/api/admin/claims')
    );
  }

  async waitForClaimsToLoad(responsePromise) {
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
    const value = status === 'All Statuses' ? '' : status.toUpperCase().replace(/ /g, '_');
    const claimsResponse = this.waitForClaimsResponse();
    await this.statusFilter.selectOption(value);
    await expect(this.statusFilter).toHaveValue(value);
    await this.waitForClaimsToLoad(claimsResponse);
  }

  claimRow(claimId) {
    return this.page.getByRole('row').filter({
      has: this.page.getByTestId(`status-select-${claimId.slice(0, 8)}`),
    });
  }

  async changeClaimStatus(claimId, status) {
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
    await dialog.getByRole('button', { name: 'Confirm', exact: true }).click();
    await expect(dialog).toBeHidden();
    await expect(row).toContainText(status, { timeout: 15_000 });
  }

  async logout() {
    await this.page.getByRole('button', { name: /^logout$/i }).click();
    await expect(this.page).toHaveURL(/\/login(?:\?.*)?$/, { timeout: 15_000 });
  }
}

module.exports = { AdminClaimsPage };
