import { expect, test } from '@playwright/test';
import { HomeAndLoginPage } from '../pages/HomeAndLoginPage';
import { PASSWORD } from '../../utils/requiredParams';
import { ProductsPage } from '../pages/ProductsPage';

let homepage: HomeAndLoginPage;
let productsPage: ProductsPage;

const baseUrl = 'https://automationexercise.com/';
const existingUserEmail = 'james.bond@gmail.com';
const password = PASSWORD;

test.describe('Search out products and place order', () => {
  test.beforeEach(async ({ page }) => {
    homepage = new HomeAndLoginPage(page);
    productsPage = new ProductsPage(page);
    await page.goto(baseUrl);
  });

  test('Existing user login and search products', async ({ page }) => {
    await page.waitForLoadState('load', { timeout: 3000 });
    await homepage.clickSignupLogin();
    await homepage.loginExistingUser(existingUserEmail, password);
    await homepage.navigateProductsPage();
    const title = await productsPage.getPageTitle();
    expect(title).toEqual('Automation Exercise - All Products');

    await productsPage.searchProducts('polo');
    await expect(productsPage.getSearchedProductsText()).toBeVisible();
    await expect(productsPage.getSearchedProductPoloName()).toBeVisible();
  });

  test('User search products by category - kids, add the product to cart to order', async ({
    page,
  }) => {
    const product = 'Cotton Mull Embroidered Dress';
    await page.waitForLoadState('load', { timeout: 3000 });
    await homepage.clickSignupLogin();
    await homepage.loginExistingUser(existingUserEmail, password);
    await homepage.navigateProductsPage();

    await productsPage.searchByCategory('KIDS', 'DRESS');
    await expect(productsPage.getKidsDressProductsText()).toBeVisible();

    await productsPage.selectAProduct(product);
    await expect(productsPage.getSelectedProductName(product)).toBeVisible();

    await productsPage.addProductToCart();
    await expect(productsPage.getConfirmModal()).toBeVisible();
    await productsPage.clickViewCart();
    await expect(productsPage.getSelectedProductName(product)).toBeVisible();
  });
});
