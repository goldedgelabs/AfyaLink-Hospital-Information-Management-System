import { test, expect } from '@playwright/test';
test('admin page loads', async ({ page }) => {
  await page.goto('http://localhost:3000/dashboard/admin');
  await expect(page.locator('text=Admin Console')).toBeVisible();
});
