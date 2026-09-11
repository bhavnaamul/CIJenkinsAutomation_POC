import { test, expect } from "@playwright/test";
import { HomePage } from "../../page-objects/HomePage";
import { LoginPage } from "../../page-objects/LoginPage";
import { TransferPage } from "../../page-objects/TransferPage";
import { TransferFundsData } from "../../testdata/testdata.types";
import transferdata from "../../testdata/transferdata.json";
import { validateTransferResult } from "../../utils/transferResultStrategy";
import * as allure from "allure-js-commons";

test.describe("Transfer Checking", async () => {
  let loginPage: LoginPage;
  let homePage: HomePage;
  let transferPage: TransferPage;
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    homePage = new HomePage(page);
    transferPage = new TransferPage(page);
    await loginPage.visit();
    await loginPage.login("standard_user", "bank_sauce");
    await homePage.assertDashboard();
  });
  test("Transfer between same account", async ({ page }) => {
    await allure.epic("---Tranfer Fund Management----");
    await allure.feature("Transfer funds within same Accounts");
    await allure.story("Transfer");
    await allure.severity("critical");
    await homePage.clickOnTabs("Transfer");
    await expect(homePage.transferMoneyLabel).toBeVisible();
    await transferPage.openFromAccountDropdown();
    await transferPage.selectFirstOption();
    await transferPage.openToAccountDropdown();
    await transferPage.selectFirstOptionFromToAccount();
    await transferPage.enterAmount("1.0");
    await transferPage.transferMoney_Checking();
  });

  test("Transfer between same account with amount exceeding total amount in the bank", async ({
    page,
  }) => {
    await allure.epic("---Tranfer Fund Management----");
    await allure.feature(
      "Transfer funds within same Accounts exceeding total amount",
    );
    await allure.story("Transfer");
    await allure.severity("critical");
    await homePage.clickOnTabs("Transfer");
    await expect(homePage.transferMoneyLabel).toBeVisible();
    await transferPage.openFromAccountDropdown();
    await transferPage.selectFirstOption();
    await transferPage.openToAccountDropdown();
    await transferPage.selectFirstOptionFromToAccount();
    await transferPage.enterAmount("5000");
    await transferPage.transferMoney_Checking();
    await transferPage.errorMsg();
  });

  test("Transfer between different account", async ({ page }) => {
    await allure.epic("---Tranfer Fund Management----");
    await allure.feature("Transfer funds between differnt Accounts");
    await allure.story("Transfer");
    await allure.severity("critical");
    await homePage.clickOnTabs("Transfer");
    await expect(homePage.transferMoneyLabel).toBeVisible();
    await transferPage.openFromAccountDropdown();
    await transferPage.selectOption(1);
    await transferPage.openToAccountDropdown();
    await transferPage.selectFirstOptionFromToAccount();
    await transferPage.enterAmount("2");
    await transferPage.transferMoney_Checking();
  });

  for (const transfer of transferdata as TransferFundsData[]) {
    test(`Trnsfer money based on various ${transfer.amount}`, async () => {
      await allure.epic("---Tranfer Fund Management----");
      await allure.feature("Parameterized fund transfer test");
      await allure.story("Transfer");
      await allure.severity("critical");
      await homePage.clickOnTabs("Transfer");
      await expect(homePage.transferMoneyLabel).toBeVisible();
      await transferPage.openFromAccountDropdown();
      await transferPage.selectFirstOption();
      await transferPage.openToAccountDropdown();
      await transferPage.selectFirstOptionFromToAccount();
      await transferPage.enterAmount(transfer.amount);
      await transferPage.transferMoney_Checking();
    });
  }

  //this works as per the requirment
  for (const transfer of transferdata as TransferFundsData[]) {
    test(`Transfer money - ${transfer.amount} - ${transfer.expectedResult}`, async () => {
      await homePage.clickOnTabs("Transfer");
      await expect(homePage.transferMoneyLabel).toBeVisible();
      // await transferPage.openFromAccountDropdown()
      // await transferPage.selectFromAccount(transfer.fromAccount)
      // await transferPage.openToAccountDropdown()
      // await transferPage.selectFirstOptionFromToAccount()
      await transferPage.openFromAccountDropdown();
      await transferPage.selectFirstOption();
      await transferPage.openToAccountDropdown();
      await transferPage.selectFirstOptionFromToAccount();
      await transferPage.enterAmount(transfer.amount);
      await transferPage.transferMoney_Checking();
      if (transfer.expectedResult === "success") {
        await transferPage.confirmTransferWindow();
        await expect(transferPage.successMessage).toContainText(
          transfer.expectedMessage,
        );
      } else if (transfer.expectedResult === "error") {
        await expect(transferPage.errorMessage).toContainText(
          transfer.expectedMessage,
        );
      }
    });
  }

  // //optyimised version
  // for (const transfer of transferdata as TransferFundsData[]) {
  //   test(`Transfer money optimsed - ${transfer.amount} - ${transfer.expectedResult}`, async () => {
  //     await homePage.clickOnTabs('Transfer')
  //     await expect(homePage.transferMoneyLabel).toBeVisible()
  //     await transferPage.openFromAccountDropdown()
  //     await transferPage.selectFirstOption()
  //     await transferPage.openToAccountDropdown()
  //     await transferPage.selectFirstOptionFromToAccount()
  //     await transferPage.enterAmount(transfer.amount)
  //     await transferPage.transferMoney_Checking()
  //     await validateTransferResult(transferPage, transfer)
  //     await transferPage.confirmTransferWindow()
  //   })
  // }
});
