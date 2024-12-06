import { expect, test } from "@playwright/test";

import { URL } from "../support";

test.describe("Burger menu", () => {
  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push(
      {
        type: "Feature Description",
        description: "Interact with the burger menu for easy navigation",
      },
      {
        type: "Feature Requirements",
        description:
          "User can view the burger menu, open and close it, and view and use all available options.",
      },
    );
  });

  test(
    "user can open and close the burger menu",
    { tag: "@P2" },
    async ({ page }) => {
      await test.step("Navigate to login page and login", async () => {
        await page.goto(URL);
        await expect(page).toHaveTitle(/Swag Labs/);

        await page.getByTestId("username").fill("standard_user");
        await page.getByTestId("password").fill("secret_sauce");
        await page.getByTestId("login-button").click();
        await expect(page).toHaveURL(URL + "inventory.html");
        await expect(page.getByTestId("primary-header")).toContainText(
          "Swag Labs",
        );
      });

      await test.step("open and verify items", async () => {
        await page.getByRole("button", { name: "Open Menu" }).click();
        await expect(page.locator(".menu-item")).toHaveCount(4);
      });

      await test.step("close menu", async () => {
        await page.getByRole("button", { name: "Close Menu" }).click();
        await expect(
          page.getByRole("button", { name: "Open Menu" }),
        ).toBeVisible();
      });
    },
  );
});
