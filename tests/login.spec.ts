import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:3000/");
});

test.describe("Login screen", () => {
  test("has title", async ({ page }) => {
    // Expect a title "to contain" a substring.
    await expect(page.getByText(/Welcome/)).toBeVisible();
  });

  test("shows error on incorrect data", async ({ page }) => {
    await page.fill("input[id='email']", "hsilvap@me.com");
    await page.fill("input[id='password']", "hello");
    await page.getByTestId("submit-btn").click();

    await expect(
      page.getByText("Incorrect username or password.")
    ).toBeVisible();
  });

  test("should login correctly", async ({ page }) => {
    const password = process.env.VITE_APP_TEST_USER_PASSWORD ?? "";
    await page.fill("input[id='email']", "hsilvap@me.com");
    await page.fill("input[id='password']", password);
    await page.getByTestId("submit-btn").click();

    //gets redirected
    await expect(page.getByText("New operation")).toHaveCount(2);
  });
});
