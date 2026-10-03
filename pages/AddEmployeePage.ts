import { expect, type Locator, type Page } from "@playwright/test";

export class AddEmployeePage {
  readonly page: Page;

  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly saveButton: Locator;

  readonly personalDetailsTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstNameInput = page.getByPlaceholder("First Name");
    this.lastNameInput = page.getByPlaceholder("Last Name");

    this.employeeIdInput = page
      .locator("label")
      .filter({ hasText: "Employee Id" })
      .locator("..")
      .locator("..")
      .getByRole("textbox");

    this.saveButton = page.getByRole("button", { name: "Save" });

    this.personalDetailsTitle = page.getByRole("heading", {
      name: "Personal Details",
      exact: true,
    });
  }

  async createEmployee(firstName: string, lastName: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);

    await this.saveButton.click();
  }

  async expectEmployeeCreated() {
    await expect(this.personalDetailsTitle).toBeVisible();
  }
}
