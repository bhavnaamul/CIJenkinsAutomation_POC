import { test, Page, Locator, expect } from '@playwright/test'

export class TransferPage {
  readonly page: Page
  readonly FromAccount: Locator
  readonly FromAccountOption: Locator
  readonly ToAccount: Locator
  readonly ToAccountOption: Locator
  readonly Amount: Locator
  readonly reviewTransferBtn: Locator
  readonly confirmTransfer: Locator
  readonly successMessage: Locator
  readonly FromAccountSelected: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.FromAccount = page.locator('#transfer-from-trigger')
    this.FromAccountOption = page.getByTestId('transfer-from-option')

    this.ToAccount = page.locator('#transfer-to-trigger')
    this.ToAccountOption = page.getByTestId('transfer-to-option')

    this.Amount = page.locator('#transfer-amount')
    this.reviewTransferBtn = page.getByTestId('review-transfer-btn')
    this.confirmTransfer = page.getByTestId('confirm-transfer-btn')
    this.successMessage = page.getByRole('heading', {
      name: 'Transfer Successful',
    })

    this.FromAccountSelected = page.getByTestId('confirm-from-account')
    this.errorMessage = page.getByTestId('transfer-error-message')
  }

  async openFromAccountDropdown() {
    await this.FromAccount.click()
  }

  async openToAccountDropdown() {
    await this.ToAccount.click()
  }

  async selectFromAccount(account: string) {
    await this.page.getByText(account, { exact: true }).click()
  }
  async selectFirstOption() {
    console.log(
      '*****option texts:',
      await this.FromAccountOption.allTextContents(),
    )

    await this.FromAccountOption.first().click()
  }

  async selectFirstOptionFromToAccount() {
    console.log(
      '*****option texts:',
      await this.ToAccountOption.allTextContents(),
    )

    await this.ToAccountOption.first().click()
  }

  async selectOption(index: number) {
    await this.FromAccountOption.nth(index).waitFor({
      state: 'visible',
    })

    await this.FromAccountOption.nth(index).click()
  }

  async enterAmount(amt: string) {
    await this.Amount.fill(amt)
  }

  async transferMoney_Checking() {
    await this.reviewTransferBtn.click()
  }

  async confirmTransferWindow() {
    await this.confirmTransfer.click()
  }
  async successMsg() {
    await expect(this.successMessage).toBeVisible()
    //await expect(this.FromAccountSelected).toContainText('Everyday Checking')
  }

  async errorMsg() {
    await expect(this.errorMessage).toBeVisible()
    // await expect(this.errorMessage).toContainText(
    //   'Insufficient funds. Available balance: $4,250.00',
    // )
  }
}
