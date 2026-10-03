import { test as base } from "@playwright/test";

import { LoginPage } from "../pages/LoginPage";
import { DashboardPage } from "../pages/DashboardPage";
import { PimPage } from "../pages/PimPage";
import { AddEmployeePage } from "../pages/AddEmployeePage";

type Pages = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  pimPage: PimPage;
  addEmployeePage: AddEmployeePage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  pimPage: async ({ page }, use) => {
    await use(new PimPage(page));
  },

  addEmployeePage: async ({ page }, use) => {
    await use(new AddEmployeePage(page));
  },
});

export { expect } from "@playwright/test";
