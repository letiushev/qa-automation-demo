import { test } from "../../fixtures/pages.fixture";
import { generateEmployee } from "../../utils/testData";

test("@smoke create, find and delete employee", async ({
  dashboardPage,
  pimPage,
  addEmployeePage,
  page,
}) => {
  const employee = generateEmployee();

  await test.step("Open PIM", async () => {
    await page.goto("/web/index.php/dashboard/index");
    await dashboardPage.openPim();
  });

  await test.step("Create employee", async () => {
    await pimPage.openAddEmployee();

    await addEmployeePage.createEmployee(employee.firstName, employee.lastName);

    await addEmployeePage.expectEmployeeCreated();
  });

  await test.step("Find employee", async () => {
    await dashboardPage.openPim();

    await pimPage.searchEmployee(employee.fullName);

    await pimPage.expectEmployeeInResults(employee.fullName);
  });

  await test.step("Delete employee", async () => {
    await pimPage.deleteEmployee(employee.fullName);

    await pimPage.expectEmployeeDeleted(employee.fullName);
  });
});
