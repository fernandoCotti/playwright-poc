import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';

test.describe('Cart and sorting', () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login('standard_user', 'secret_sauce');
  });

  test('adding multiple items updates the cart badge count', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.addItemToCartByName('Sauce Labs Backpack');
    await inventory.addItemToCartByName('Sauce Labs Bike Light');
    await inventory.expectCartCount(2);
  });

  test('sorting price low to high returns an ascending sequence', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('lohi');
    const prices = await inventory.getDisplayedPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sorted);
  });

  test('sorting price high to low returns a descending sequence', async ({ page }) => {
    const inventory = new InventoryPage(page);
    await inventory.sortBy('hilo');
    const prices = await inventory.getDisplayedPrices();
    const sorted = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sorted);
  });
});
