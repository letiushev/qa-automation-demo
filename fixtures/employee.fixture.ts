import { test as base } from "./pages.fixture";
import { generateEmployee } from "../utils/testData";

type EmployeeData = {
  firstName: string;
  lastName: string;
  fullName: string;
};

type EmployeeFixtures = {
  employee: EmployeeData;
};

export const test = base.extend<EmployeeFixtures>({
  employee: async ({ dashboardPage, pimPage, addEmployeePage, page }, use) => {
    const employee = generateEmployee();

    await page.goto("/web/index.php/dashboard/index");
    await dashboardPage.openPim();
    await pimPage.openAddEmployee();

    await addEmployeePage.createEmployee(employee.firstName, employee.lastName);

    await addEmployeePage.expectEmployeeCreated();

    await use(employee);

    await dashboardPage.openPim();
    await pimPage.searchEmployee(employee.fullName);
    await pimPage.deleteEmployee(employee.fullName);
  },
});

export { expect } from "@playwright/test";
