import { expect, test } from '@playwright/test';
import { HomeAndLoginPage } from '../pages/HomeAndLoginPage';
import { SignupAndAccountCreatedPage } from '../pages/SignupAndAccountCreatedPage';
import { PASSWORD } from '../../utils/requiredParams';

let homepage: HomeAndLoginPage;
let signupPage: SignupAndAccountCreatedPage;

const baseUrl = 'https://automationexercise.com/';
const newUserName = 'John';
const userEmail = 'john.smith@smithcity.com';
const existingUserName = 'James';
const existingUserEmail = 'james.bond@gmail.com';
const password = PASSWORD;

const date = '27';
const month = '11';
const year = '2000';

export type AddressInfo = {
  firstName: string;
  lastName: string;
  companyName: string;
  address: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobile: string;
};

const addressInfo: AddressInfo = {
  firstName: 'John',
  lastName: 'Smith',
  companyName: 'Smithcity',
  address: '100 Willi street',
  address2: 'Te Aro',
  country: 'New Zealand',
  state: 'Wellington',
  city: 'Wellington',
  zipcode: '1234',
  mobile: '0212345678',
};

test.describe('Basic Test Cases: register user and delete user, user login with valid email and password and logout', () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomeAndLoginPage(page);
    signupPage = new SignupAndAccountCreatedPage(page);
    await page.goto(baseUrl);
  });

  test('Should be able to register an user with valid', async ({ page }) => {
    let title: string;
    await page.waitForLoadState('load', { timeout: 3000 });
    title = await homepage.getPageTitle();
    expect(title).toEqual('Automation Exercise');
    await homepage.clickSignupLogin();
    await expect(homepage.getNewUserSignupLabel()).toBeVisible();
    await homepage.signupNewUser(newUserName, userEmail);
    await expect(signupPage.getEnterAccountInformationLabel()).toBeVisible();

    await signupPage.enterAccountInformation(password, date, month, year);
    await signupPage.enterAddressInformation(addressInfo);

    await signupPage.clickCreateAccountButton();
    await expect(signupPage.getAccountCreatedText()).toBeVisible();

    await signupPage.clickContinueButton();
    await expect(
      homepage.getLoggedAsUsernameText(addressInfo.firstName)
    ).toBeVisible();

    await signupPage.clickDeleteButton();
    await expect(signupPage.getAccountDeletedText()).toBeVisible();
    await signupPage.clickContinueButton();
    title = await homepage.getPageTitle();
    expect(title).toEqual('Automation Exercise');
  });

  test('Existing user login with valid password and logout', async ({
    page,
  }) => {
    await page.waitForLoadState('load', { timeout: 3000 });
    await homepage.clickSignupLogin();
    await expect(homepage.getLoginAccountText()).toBeVisible();
    await homepage.loginExistingUser(existingUserEmail, password);
    await expect(
      homepage.getLoggedAsUsernameText(existingUserName)
    ).toBeVisible();

    await homepage.logoutUser();
    const title = await homepage.getPageTitle();
    expect(title).toEqual('Automation Exercise - Signup / Login');
  });
});
