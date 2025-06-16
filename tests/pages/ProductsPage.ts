import { Locator, Page } from '@playwright/test';
import { getIndexFromProductsList } from '../../utils/helpers';

export class ProductsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async getPageTitle(): Promise<string> {
    return await this.page.title();
  }

  async searchProducts(product: string): Promise<void> {
    await this.page.locator('#search_product').fill(product);
    await this.page.locator('#submit_search').click();
  }

  async searchByCategory(category: string, subCategory: string): Promise<void> {
    await this.page.locator('#accordian').getByText(category).click();
    await this.page.locator('#Kids').getByText(subCategory).click();
  }

  async getTotalProductsSearched(): Promise<Locator> {
    return this.page.locator('.single-products');
  }

  async selectAProduct(prodName: string): Promise<void> {
    const totalProductsSearched = await this.getTotalProductsSearched();
    const index = await getIndexFromProductsList(
      totalProductsSearched,
      prodName
    );
    const viewProductList = this.page.getByText('View Product');
    await viewProductList.nth(index).click();
  }

  async addProductToCart(): Promise<void> {
    await this.page.getByRole('button', { name: 'Add to cart' }).click();
  }

  async clickViewCart(): Promise<void> {
    await this.getConfirmModal().getByText('View Cart').click();
  }

  getSearchedProductsText(): Locator {
    return this.page.getByText('Searched Products');
  }

  getSearchedProductPoloName(): Locator {
    return this.page.getByText('Premium Polo T-Shirts').first();
  }

  getKidsDressProductsText(): Locator {
    return this.page.getByText('Kids - Dress Products');
  }

  getSelectedProductName(prodName: string): Locator {
    return this.page.getByText(prodName);
  }

  getConfirmModal(): Locator {
    return this.page.locator('.modal-content');
  }
}
