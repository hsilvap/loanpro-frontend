import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  const password = process.env.VITE_APP_TEST_USER_PASSWORD ?? "";

  await page.goto("http://localhost:3000/");
  await page.fill("input[id='email']", "hsilvap@me.com");
  await page.fill("input[id='password']", password);
  await page.getByTestId("submit-btn").click();
});

test.describe("Operations screem", () => {
  test("shows two input boxes", async ({ page }) => {
    await page.waitForSelector('[aria-haspopup="listbox"]');

    await page.click('[aria-haspopup="listbox"]');

    await page.waitForSelector('ul[role="listbox"]');

    await page.getByText("addition").click();

    await expect(page.getByTestId("amount")).toBeVisible();
    await expect(page.getByTestId("secondAmount")).toBeVisible();
  });

  test("shows one input box", async ({ page }) => {
    await page.waitForSelector('[aria-haspopup="listbox"]');

    await page.click('[aria-haspopup="listbox"]');

    await page.waitForSelector('ul[role="listbox"]');

    await page.getByText("square_root").click();

    await expect(page.getByTestId("amount")).toBeVisible();
    await expect(page.getByTestId("secondAmount")).not.toBeVisible();
  });

  test("has no input box", async ({ page }) => {
    await page.waitForSelector('[aria-haspopup="listbox"]');

    await page.click('[aria-haspopup="listbox"]');

    await page.waitForSelector('ul[role="listbox"]');

    await page.getByText("random_string").click();

    await expect(page.getByTestId("amount")).not.toBeVisible();
    await expect(page.getByTestId("secondAmount")).not.toBeVisible();
  });
});
