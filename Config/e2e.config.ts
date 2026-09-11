import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  timeout: 60000,
  retries: process.env.CI ? 2 : 0,
  testDir: "../tests/E2E",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  reporter: [
    ["list"],
    ["html", { outputFolder: "playwright-report", open: "never" }],
    ["allure-playwright"],
  ],
  workers: process.env.CI ? 4 : 10,

  use: {
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    ignoreHTTPSErrors: true,
    video: "off",
    screenshot: "on",
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
