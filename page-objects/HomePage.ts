import { Page, Locator, expect } from '@playwright/test'

export class HomePage {
  readonly page: Page
  readonly dashBoard: Locator
  readonly accounts: Locator
  readonly transfer: Locator
  readonly sendMoney: Locator
  readonly payBill: Locator
  readonly quickAccess_TransfeMoney: Locator
  readonly quickAccess_sendMoney: Locator
  readonly transferMoneyLabel: Locator
  readonly sendMoneyLabel: Locator

  constructor(page: Page) {
    this.page = page
    this.dashBoard = page.locator('a[data-testid="sidebar-link-dashboard"]')
    this.accounts = page.locator('a[data-testid="sidebar-link-accounts"]')
    this.transfer = page.locator('a[data-testid="sidebar-link-transfer"]')
    this.sendMoney = page.locator('a[data-testid="sidebar-link-transfer"]')
    this.payBill = page.getByTestId('sidebar-link-bill-pay')
    this.quickAccess_TransfeMoney = page.getByTestId('quick-action-transfer')
    this.quickAccess_sendMoney = page.getByTestId('quick-action-send-money')
    this.transferMoneyLabel = page.getByRole('heading', {
      name: 'Transfer Money',
    })

    this.sendMoneyLabel = page.getByRole('heading', {
      name: 'Send Money',
    })
  }
  async assertDashboard() {
    await expect(this.dashBoard).toBeVisible()
  }

  async clickOnTabs(tabName: string) {
    switch (tabName) {
      case 'Dashboard':
        await this.dashBoard.click()
        break

      case 'Accounts':
        await this.accounts.click()
        break

      case 'Transfer':
        await this.transfer.click()
        break

      case 'Send Money':
        await this.sendMoney.click()
        break

      case 'Bill Pay':
        await this.payBill.click()
        break

      case 'Transactions':
        await this.transfer.click()
        break

      case 'Apply Loan':
        await this.transfer.click()
        break

      case 'Notifications':
        await this.transfer.click()
        break

      case 'Profile':
        await this.transfer.click()
        break

      case 'Test Cases':
        await this.transfer.click()
        break

      default:
        throw new Error('This option does not exist..')
    }
  }

  async quickAccess(tabName: string) {
    switch (tabName) {
      case 'Dashboard TransferMoney':
        await this.quickAccess_TransfeMoney.click()
        break

      case 'Dashboard SendMoney':
        await this.quickAccess_sendMoney.click()
        break

      default:
        throw new Error('This is incorrect option')
    }
  }
}
