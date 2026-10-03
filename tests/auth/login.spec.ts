import { test, expect } from "../../fixtures/pages.fixture";

test("@smoke successful login", async ({ loginPage, page }) => {
  await loginPage.open();

  await loginPage.login(
    process.env.ADMIN_USERNAME!,
    process.env.ADMIN_PASSWORD!,
  );

  await expect(page).toHaveURL(/dashboard/);
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("@regression login with invalid credentials", async ({ loginPage }) => {
  await loginPage.open();

  await loginPage.login(process.env.ADMIN_USERNAME!, "wrong-password");

  await loginPage.expectInvalidCredentials();
});
