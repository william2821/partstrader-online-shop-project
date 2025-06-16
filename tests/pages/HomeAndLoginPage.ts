import { Locator, Page } from '@playwright/test';

export class HomeAndLoginPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async clickSignupLogin(): Promise<void> {
    await this.page.getByText(' Signup / Login').click();
  }

  async signupNewUser(name: string, email: string): Promise<void> {
    await this.page.getByPlaceholder('name').fill(name);
    await this.page
      .locator('.signup-form')
      .getByPlaceholder('email')
      .fill(email);
    await this.page.getByRole('button', { name: 'Signup' }).click();
  }

  async loginExistingUser(email: string, password: string): Promise<void> {
    await this.page
      .locator('form')
      .filter({ hasText: 'Login' })
      .getByPlaceholder('Email Address')
      .fill(email);
    await this.page.getByPlaceholder('Password').fill(password);
    await this.page.getByRole('button', { name: 'Login' }).click();
  }

  async logoutUser(): Promise<void> {
    await this.page.getByText('Logout').click();
  }

  async navigateProductsPage(): Promise<void> {
    await this.page.getByText('Products').click();
  }

  getLoggedAsUsernameText(firstname: string): Locator {
    return this.page.getByText(`Logged in as ${firstname}`);
  }

  getNewUserSignupLabel(): Locator {
    return this.page.getByText('New User Signup!');
  }

  getLoginAccountText(): Locator {
    return this.page.getByText('Login to your account');
  }
}
