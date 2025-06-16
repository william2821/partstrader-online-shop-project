import { Locator, Page } from '@playwright/test';
import { AddressInfo } from '../spec/register-user-login.test';

export class SignupAndAccountCreatedPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  getEnterAccountInformationLabel(): Locator {
    return this.page.getByText('Enter Account Information');
  }

  getAccountCreatedText(): Locator {
    return this.page.getByText('ACCOUNT CREATED!');
  }

  getAccountDeletedText(): Locator {
    return this.page.getByText('ACCOUNT DELETED!');
  }

  async enterAccountInformation(
    password: string,
    date: string,
    month: string,
    year: string
  ): Promise<void> {
    await this.page.locator('#id_gender1').click();
    await this.page.getByLabel('Password').fill(password);

    const dropDownListDay = this.page.locator('#days');
    await dropDownListDay.selectOption(date);
    const dropDownListMonth = this.page.locator('#months');
    await dropDownListMonth.selectOption(month);
    const dropDownListYear = this.page.locator('#years');
    await dropDownListYear.selectOption(year);

    await this.page.check('#newsletter');
    await this.page.check('#optin');
  }

  async enterAddressInformation(addressInfo: AddressInfo): Promise<void> {
    await this.page.getByLabel('First name').fill(addressInfo.firstName);
    await this.page.getByLabel('Last name').fill(addressInfo.lastName);
    await this.page
      .getByRole('textbox', { name: 'Company', exact: true })
      .fill(addressInfo.companyName);
    await this.page
      .getByRole('textbox', { name: 'Address * (Street address, P.' })
      .fill(addressInfo.address);
    await this.page
      .getByRole('textbox', { name: 'Address 2' })
      .fill(addressInfo.address2);
    await this.page.locator('#country').selectOption(addressInfo.country);

    await this.page.getByLabel('State').fill(addressInfo.state);
    await this.page.getByLabel('City').fill(addressInfo.city);
    await this.page.locator('#zipcode').fill(addressInfo.zipcode);
    await this.page.getByLabel('Mobile Number').fill(addressInfo.mobile);
  }

  async clickCreateAccountButton(): Promise<void> {
    await this.page.getByRole('button', { name: 'Create Account' }).click();
    await this.page.waitForTimeout(3000);
  }

  async clickContinueButton(): Promise<void> {
    await this.page.getByText('Continue').click();
  }

  async clickDeleteButton(): Promise<void> {
    await this.page.getByText('Delete Account').click();
  }

  async deleteAccount(): Promise<void> {
    await this.clickDeleteButton();
    await this.clickContinueButton();
  }
}
