import { expect, test } from "@playwright/test";

import { URL } from "../support";

test.describe("Login scenarios", () => {
  test.beforeEach((_, testInfo) => {
    testInfo.annotations.push(
      {
        type: "Feature Description",
        description: "Login scenarios for the Swag Labs website",
      },
      {
        type: "Feature Requirements",
        description:
          "User should be able to login, logout and persist sessions. Invalid user credentials should not be able to login.",
      },
    );
  });

  test("can login", { tag: "@P1" }, async ({ page }) => {
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

  test("can logout", { tag: "@P1" }, async ({ page }) => {
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

    await test.step("Logout", async () => {
      await page.getByRole("button", { name: "Open Menu" }).click();
      await page.getByTestId("logout-sidebar-link").click();
      await expect(page.getByTestId("username")).toBeVisible();
    });
  });

  test(
    "cannot login with invalid username",
    { tag: ["@P1", "@ai-generated"] },
    async ({ page }) => {
      await test.step("Navigate to login page", async () => {
        await page.goto(URL);
        await expect(page).toHaveTitle(/Swag Labs/);
      });
      await test.step("Fill login form with invalid username", async () => {
        await page.getByTestId("username").fill("invalid_user");
        await page.getByTestId("password").fill("secret_sauce");
        await page.getByTestId("login-button").click();
      });
      await test.step("Verify error message is displayed", async () => {
        await expect(page.getByTestId("error")).toHaveText(
          /Epic sadface: Username and password do not match any user in this service/,
        );
      });
    },
  );

  test(
    "cannot login as a locked out user",
    { tag: ["@P2"] },
    async ({ page }) => {
      await test.step("Navigate to login page", async () => {
        await page.goto(URL);
        await expect(page).toHaveTitle(/Swag Labs/);
      });

      await test.step("Fill in login form", async () => {
        await page.getByTestId("username").fill("locked_out_user");
        await page.getByTestId("password").fill("secret_sauce");
        await page.getByTestId("login-button").click();
      });

      await test.step("Verify user is shown an error and remains on the page", async () => {
        await expect(page.getByTestId("error")).toHaveText(
          "Epic sadface: Sorry, this user has been locked out.",
        );
        await expect(page).toHaveURL(URL);
      });
    },
  );

  test(
    "cannot login with empty username",
    { tag: ["@P2", "@ai-generated"] },
    async ({ page }) => {
      await test.step("Navigate to login page", async () => {
        await page.goto(URL);
      });
      await test.step("Fill login form with empty password", async () => {
        await page.getByTestId("username").fill("");
        await page.getByTestId("password").fill("bad_password");
        await page.getByTestId("login-button").click();
      });
      await test.step("Verify error message is displayed", async () => {
        await expect(page.getByTestId("error")).toHaveText(
          /Username is required/,
        );
      });
    },
  );

  test(
    "cannot login with empty password",
    { tag: ["@P2", "@ai-generated"] },
    async ({ page }) => {
      await test.step("Navigate to login page", async () => {
        await page.goto(URL);
      });
      await test.step("Fill login form with empty password", async () => {
        await page.getByTestId("username").fill("standard_user");
        await page.getByTestId("password").fill("");
        await page.getByTestId("login-button").click();
      });
      await test.step("Verify error message is displayed", async () => {
        await expect(page.getByTestId("error")).toHaveText(
          /Password is required/,
        );
      });
    },
  );

  test(
    "cannot login with invalid password",
    { tag: ["@P2", "@ai-generated"] },
    async ({ page }) => {
      await test.step("Navigate to login page", async () => {
        await page.goto(URL);
      });
      await test.step("Fill login form with invalid password", async () => {
        await page.getByTestId("username").fill("standard_user");
        await page.getByTestId("password").fill("bad_password");
        await page.getByTestId("login-button").click();
      });
      await test.step("Verify error message is displayed", async () => {
        await expect(page.getByTestId("error")).toHaveText(
          /Epic sadface: Username and password do not match any user in this service/,
        );
      });
    },
  );

  test(
    "valid session persists after page reload",
    { tag: ["@P3", "@ai-generated"] },
    async ({ page }) => {
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

      await test.step("Reload the page", async () => {
        await page.goto("https://google.com");
      });

      await test.step("Verify user is still logged in", async () => {
        await page.goto(URL + "inventory.html");
        await expect(page).toHaveURL(URL + "inventory.html");
        await expect(page.getByTestId("primary-header")).toContainText(
          "Swag Labs",
        );
      });
    },
  );
});
