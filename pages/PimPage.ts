import { expect, type Locator, type Page } from "@playwright/test";

export class PimPage {
  readonly page: Page;

  readonly employeeInformationTitle: Locator;
  readonly addEmployeeButton: Locator;
  readonly employeeNameInput: Locator;
  readonly searchButton: Locator;
  readonly deleteButton: Locator;
  readonly confirmDeleteButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.employeeInformationTitle = page.getByText("Employee Information", {
      exact: true,
    });

    this.addEmployeeButton = page.getByRole("button", {
      name: "Add",
    });

    this.employeeNameInput = page.getByPlaceholder("Type for hints...").first();

    this.searchButton = page.getByRole("button", {
      name: "Search",
    });

    this.deleteButton = page.getByRole("button").filter({
      has: page.locator("i.bi-trash"),
    });

    this.confirmDeleteButton = page.getByRole("button", {
      name: "Yes, Delete",
    });
  }

  async expectOpened() {
    await expect(this.employeeInformationTitle).toBeVisible();
  }

  async openAddEmployee() {
    await this.addEmployeeButton.click();
  }

  async searchEmployee(employeeName: string) {
    await this.employeeNameInput.fill(employeeName);

    await this.page
      .getByRole("option")
      .filter({ hasText: employeeName })
      .click();

    await this.searchButton.click();
  }

  async expectEmployeeInResults(employeeName: string) {
    await expect(
      this.page.getByText(employeeName, {
        exact: false,
      }),
    ).toBeVisible();
  }

  async deleteEmployee(employeeName: string) {
    const row = this.page
      .locator(".oxd-table-card")
      .filter({ hasText: employeeName });

    await row
      .getByRole("button")
      .filter({
        has: this.page.locator("i.bi-trash"),
      })
      .click();

    await this.confirmDeleteButton.click();
  }

  async expectEmployeeDeleted(employeeName: string) {
    await expect(
      this.page.getByText(employeeName, { exact: false }),
    ).not.toBeVisible();
  }
}
