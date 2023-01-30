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

export interface DbTransaction {
  id: string
  third_party_tx_id: string
  date_posted: string
  amount: string
  description: string
  notes: string
  type: string
  bank_account_id: string
}
