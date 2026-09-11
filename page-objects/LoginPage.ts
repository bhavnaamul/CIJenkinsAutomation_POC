import { test, Page, Locator, expect } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly signInBtn: Locator
  readonly errorMsg: Locator
  readonly dashBoard: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.locator('#login-username')
    this.passwordInput = page.locator('#login-password')
    this.signInBtn = page.getByRole('button', { name: 'Sign In' })
    this.errorMsg = page.locator('span[data-testid="login-error-message"]')
    this.dashBoard = page.locator('a[data-testid="sidebar-link-dashboard"]')
  }

  async visit() {
    await this.page.goto('https://qaplayground.com/bank/login')
  }

  async login(uname: string, password: string) {
    await this.usernameInput.fill(uname)
    await this.passwordInput.fill(password)
    await this.signInBtn.click()
  }

  async assertErroMsg() {
    await expect(this.errorMsg).toContainText(
      'The username or password you entered is incorrect.',
    )
  }

  async assertErroMsgForLockeduser() {
    await expect(this.errorMsg).toContainText(
      'Your account has been suspended. Please contact support.',
    )
  }
}
