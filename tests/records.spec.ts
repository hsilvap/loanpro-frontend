import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const password = process.env.VITE_APP_TEST_USER_PASSWORD ?? "";

  await page.goto("http://localhost:3000/");
  await page.fill("input[id='email']", "hsilvap@me.com");
  await page.fill("input[id='password']", password);
  await page.getByTestId("submit-btn").click();
});

test.describe("Records screem", () => {
  test("Shows the records table", async ({ page }) => {
    await page.getByText("Records").click();

    await expect(page.getByRole("table")).toBeVisible();
  });

  test("Shows the search bar", async ({ page }) => {
    await page.getByText("Records").click();

    await expect(page.getByRole("textbox")).toBeVisible();
  });
});
