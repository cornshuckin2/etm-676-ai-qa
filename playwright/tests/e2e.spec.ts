import { expect, test } from "@playwright/test";

import { URL } from "../support";
import { sample } from "lodash";

test.describe("e2e scenarios", () => {
  test(
    "user can login, add to cart and checkout",
    { tag: "@P1" },
    async ({ page }) => {
      let productName: string;
      let productPrice: string;

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

      await test.step("Add random product to the cart", async () => {
        const product = sample(await page.getByTestId("inventory-item").all());
        productName = await product
          .getByTestId("inventory-item-name")
          .textContent();
        productPrice = await product
          .getByTestId("inventory-item-price")
          .textContent();

        await product.getByRole("button", { name: "Add to cart" }).click();
        await expect(page.getByTestId("shopping-cart-link")).toContainText("1");
      });

      await test.step("Navigate to cart", async () => {
        await page.getByTestId("shopping-cart-link").click();
        await expect(page).toHaveURL(URL + "cart.html");
        await expect(page.getByTestId("inventory-item-name")).toHaveText(
          productName,
        );
        await expect(page.getByTestId("inventory-item-price")).toHaveText(
          productPrice,
        );
      });

      await test.step("Checkout step one", async () => {
        await page.getByRole("button", { name: "Checkout" }).click();
        await expect(page).toHaveURL(URL + "checkout-step-one.html");

        await page.getByTestId("firstName").fill("John");
        await page.getByTestId("lastName").fill("Doe");
        await page.getByTestId("postalCode").fill("12345");

        await page.getByRole("button", { name: "Continue" }).click();
      });

      await test.step("Checkout step two", async () => {
        const normalizedPrice = Number(productPrice.replace("$", ""));
        const tax = (normalizedPrice * 0.08).toFixed(2);
        const total = (normalizedPrice + Number(tax)).toFixed(2);

        await expect(page.getByTestId("inventory-item-name")).toHaveText(
          productName,
        );
        await expect(page.getByTestId("inventory-item-price")).toHaveText(
          productPrice,
        );
        await expect(page).toHaveURL(URL + "checkout-step-two.html");
        await expect(page.getByTestId("total-label")).toHaveText(
          `Total: $${total}`,
        );

        await page.getByRole("button", { name: "Finish" }).click();
      });

      await test.step("Verify successful checkout", async () => {
        await expect(page).toHaveURL(URL + "checkout-complete.html");
        await expect(page.getByTestId("complete-header")).toHaveText(
          "Thank you for your order!",
        );
      });
    },
  );
});
