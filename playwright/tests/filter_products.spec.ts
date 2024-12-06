import { expect, test } from "@playwright/test";

import { URL } from "../support";

test.describe("Filter products", () => {
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

  for (const filter of ["Name (A to Z)", "Name (Z to A)"]) {
    test(`can filter by ${filter}`, { tag: "@P3" }, async ({ page }) => {
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

      await test.step(`Filter by ${filter}`, async () => {
        await page.selectOption('[data-test="product-sort-container"]', filter);

        const productsTexts = await page
          .getByTestId("inventory-item-name")
          .allTextContents();
        const productsTextsCopy = [...productsTexts];
        let sorted = productsTextsCopy.sort();

        if (filter === "Name (Z to A)") {
          sorted = sorted.reverse();
        }

        expect(productsTexts).toEqual(sorted);
      });
    });
  }

  for (const filter of ["Price (low to high)", "Price (high to low)"]) {
    test(`can filter by ${filter}`, { tag: "@P3" }, async ({ page }) => {
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

      await test.step(`Filter by ${filter}`, async () => {
        await page.selectOption('[data-test="product-sort-container"]', filter);
        await expect(page.getByTestId("active-option")).toHaveText(filter);

        const productsPrices = (
          await page.getByTestId("inventory-item-price").allTextContents()
        ).map((price) => parseFloat(price.replace("$", "")));
        let productsPricesCopy = [...productsPrices];

        if (filter === "Price (high to low)") {
          productsPricesCopy.sort(function (a, b) {
            return b - a;
          });
        } else {
          productsPricesCopy.sort(function (a, b) {
            return a - b;
          });
        }

        expect(productsPrices).toEqual(productsPricesCopy);
      });
    });
  }
});
