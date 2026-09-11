import { expect } from '@playwright/test'
import { TransferPage } from '../page-objects/TransferPage'
import { TransferFundsData } from '../testdata/testdata.types'

export async function validateTransferResult(
  transferPage: TransferPage,
  transfer: TransferFundsData,
) {
  switch (transfer.expectedResult) {
    case 'success':
      await expect(transferPage.successMessage).toBeVisible()

      await expect(transferPage.successMessage).toContainText(
        transfer.expectedMessage,
      )

      break

    case 'error':
      await expect(transferPage.errorMessage).toBeVisible()

      await expect(transferPage.errorMessage).toContainText(
        transfer.expectedMessage,
      )

      break
  }
}
