import { test } from "../../fixtures/pages.fixture";

test("@smoke open PIM page", async ({ dashboardPage, pimPage }) => {
  await dashboardPage.open("/web/index.php/dashboard/index");
  await dashboardPage.openPim();
  await pimPage.expectOpened();
});
