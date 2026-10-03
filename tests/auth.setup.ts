import { test as setup, expect } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.open();

  await loginPage.login(
    process.env.ADMIN_USERNAME!,
    process.env.ADMIN_PASSWORD!,
  );

  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({
    path: authFile,
  });
});
