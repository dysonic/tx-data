export interface Transaction {
  id: string
  thirdPartyTxId: string | null
  datePosted: Date
  amount: number
  description: string
  notes: string
  type: string
  bankAccountId: string
}
