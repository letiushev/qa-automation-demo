import { test, expect } from "../../fixtures/employee.fixture";

test("@smoke employee can be created and found", async ({
  employee,
  dashboardPage,
  pimPage,
  page,
}) => {
  await expect(page).toHaveURL(/viewPersonalDetails/);

  await dashboardPage.openPim();

  await pimPage.searchEmployee(employee.fullName);

  await pimPage.expectEmployeeInResults(employee.fullName);
});
