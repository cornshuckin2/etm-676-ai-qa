import { expect, test } from "@playwright/test";

import { URL } from "../support";

test.describe("Login scenarios", () => {
  test("can login", async ({ page }) => {
    await test.step("Navigate to login page", async () => {
      await page.goto(URL);
      await expect(page).toHaveTitle(/Swag Labs/);
    });

    await test.step("Fill in login form", async () => {
      await page.getByTestId("username").fill("standard_user");
      await page.getByTestId("password").fill("secret_sauce");
      await page.getByTestId("login-button").click();
    });

    await test.step("Verify successful login", async () => {
      await expect(page).toHaveURL(URL + "inventory.html");
      await expect(page.getByTestId("primary-header")).toContainText(
        "Swag Labs",
      );
    });
  });
});
