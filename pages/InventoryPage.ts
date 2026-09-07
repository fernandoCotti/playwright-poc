import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.sortDropdown = page.locator('[data-test="product-sort-container"]');
  }

  async addItemToCartByName(name: string) {
    const item = this.page.locator('.inventory_item', { hasText: name });
    await item.getByRole('button', { name: /add to cart/i }).click();
  }

  async expectCartCount(count: number) {
    await expect(this.cartBadge).toHaveText(String(count));
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getDisplayedPrices(): Promise<number[]> {
    const priceLocators = this.page.locator('.inventory_item_price');
    const texts = await priceLocators.allTextContents();
    return texts.map((t) => parseFloat(t.replace('$', '')));
  }
}
