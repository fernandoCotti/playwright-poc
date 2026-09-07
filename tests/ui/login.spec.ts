import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';

/**
 * Login coverage: happy path, locked-out user, and invalid credentials.
 * Sauce Demo ships several seeded user types specifically to exercise
 * these scenarios, which mirrors real-world negative-test design.
 */
test.describe('Login', () => {
  let loginPage: LoginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test('standard user logs in successfully', async ({ page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked-out user is blocked with a clear error', async () => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await loginPage.expectErrorContaining('locked out');
  });

  test('invalid password shows generic error, not credential-specific hint', async () => {
    await loginPage.login('standard_user', 'wrong_password');
    await loginPage.expectErrorContaining('Username and password do not match');
  });

  test('empty username is rejected client-side', async () => {
    await loginPage.login('', 'secret_sauce');
    await loginPage.expectErrorContaining('Username is required');
  });
});
