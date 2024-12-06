import { expect, test } from "@playwright/test";

import { URL } from "../support";
import { sample } from "lodash";

test.describe("Remove product from cart", () => {
  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push(
      {
        type: "Feature Description",
        description: "Filter scenarios for the Swag Labs website",
      },
      {
        type: "Feature Requirements",
        description:
          "User can filter by Name (A to Z), Name (Z to A), Price (low to high), and Price (high to low).",
      },
    );
  });

  test(
    `user can remove a product from their cart`,
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

      await test.step("Add and remove from cart from home page", async () => {
        const product = sample(await page.getByTestId("inventory-item").all());
        const productName = await product
          .getByTestId("inventory-item-name")
          .textContent();

        await product.getByRole("button", { name: "Add to cart" }).click();
        await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");
        await expect(
          product.getByRole("button", { name: "Remove" }),
        ).toBeVisible();

        await product.getByRole("button", { name: "Remove" }).click();
        await expect(
          product.getByTestId("shopping-cart-badge"),
        ).not.toBeVisible();
        await expect(
          product.getByRole("button", { name: "Add to cart" }),
        ).toBeVisible();
      });

      await test.step("Add from home page remove from cart", async () => {
        const product = sample(await page.getByTestId("inventory-item").all());
        const productName = await product
          .getByTestId("inventory-item-name")
          .textContent();

        await product.getByRole("button", { name: "Add to cart" }).click();
        await expect(page.getByTestId("shopping-cart-badge")).toHaveText("1");

        await page.getByTestId("shopping-cart-badge").click();
        await expect(page).toHaveURL(URL + "cart.html");
        await expect(page.getByTestId("inventory-item")).toHaveCount(1);
        await expect(page.getByTestId("inventory-item")).toContainText(
          productName,
        );

        await page.getByRole("button", { name: "Remove" }).click();
        await expect(page.getByTestId("inventory-item")).toHaveCount(0);
      });
    },
  );
});
