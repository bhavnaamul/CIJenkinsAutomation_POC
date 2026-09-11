export type TransferExpectedResult = 'success' | 'error'

export interface TransferFundsData {
  fromAccount: string
  toAccount: string
  amount: string
  expectedResult: TransferExpectedResult
  expectedMessage: string
}
