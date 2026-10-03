import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig({
  testDir: "./tests",

  timeout: 40_000,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ["list"],
    [
      "html",
      {
        outputFolder: "playwright-report",
        open: "never",
      },
    ],
    [
      "allure-playwright",
      {
        resultsDir: "allure-results",
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "setup",
      testMatch: /.*\.setup\.ts/,
    },

    {
      name: "auth",
      testMatch: /auth\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: {
          cookies: [],
          origins: [],
        },
      },
    },

    {
      name: "chromium",
      testMatch: /ui\/.*\.spec\.ts/,
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/user.json",
      },
      dependencies: ["setup"],
    },

    {
      name: "api",
      testMatch: /api\/.*\.spec\.ts/,
      use: {
        baseURL: "https://jsonplaceholder.typicode.com",
      },
    },
  ],
});
