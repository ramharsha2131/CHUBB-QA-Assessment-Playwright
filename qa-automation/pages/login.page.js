const { expect } = require('@playwright/test');

class LoginPage {
  constructor(page) {
    this.page = page;
  }

  async open() {
    // Open the login route and wait until the form can be used.
    await this.page.goto('/login');
    await expect(this.page.getByTestId('login-form')).toBeVisible();
  }

  async submit(email, password) {
    // Fill the credentials and submit; each spec checks the resulting behavior.
    await this.page.getByLabel('Email').fill(email);
    await this.page.locator('input[name="password"]').fill(password);
    await this.page.getByRole('button', { name: /log in/i }).click();
  }
}

module.exports = { LoginPage };
