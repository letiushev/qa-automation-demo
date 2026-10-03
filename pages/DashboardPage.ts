import type { Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;
  readonly pimMenuItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.pimMenuItem = page.getByRole("link", { name: "PIM" });
  }

  async open(url: string) {
    await this.page.goto(url);
  }

  async openPim() {
    await this.pimMenuItem.click();
  }
}
