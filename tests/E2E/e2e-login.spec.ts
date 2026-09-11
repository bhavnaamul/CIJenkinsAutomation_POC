import { test, expect } from "@playwright/test";
import { LoginPage } from "../../page-objects/LoginPage";
import { HomePage } from "../../page-objects/HomePage";
import users from "../../testdata/users.json";
import * as allure from "allure-js-commons";

test.describe("Login/Logout flow", async () => {
  let loginPage: LoginPage;
  let homePage: HomePage;

  //before hook
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);

    await allure.step("Navigate to Application AUT", async () => {
      await loginPage.visit();
    });
  });
  //negative scenario
  test("Negative scenario for login", async ({ page }) => {
    await allure.epic("---Login Management----");
    await allure.feature("Negative login");
    await allure.story("Create Investor");
    await allure.severity("critical");

    await allure.step("Login with Invalid credentials", async () => {
      await loginPage.login("invalidusername", "invalidpassword");
    });
    await allure.step("Assert for Invalid credentials", async () => {
      await loginPage.assertErroMsg();
    });
  });

  for (const user of users) {
    test(`Login with ${user.username}`, async () => {
      await allure.epic("---Login Management----");
      await allure.feature("Parameterized login");
      await allure.story("Create Investor");
      await allure.severity("critical");
      await loginPage.login(user.username, user.password);
      await loginPage.assertErroMsg();
    });
  }
  //Positive scenario+logout
  test("Positive scenario for login", async ({ page }) => {
    await allure.epic("---Login Management----");
    await allure.feature("Positive login");
    await allure.story("Create Investor");
    await allure.severity("critical");

    await allure.step("Login with valid credentials", async () => {
      await loginPage.login("standard_user", "bank_sauce");
    });
    await allure.step("Assert for valid credentials", async () => {
      await homePage.assertDashboard();
    });
  });
});
