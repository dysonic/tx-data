import { useQuery } from '@tanstack/react-query'
import { axios } from '../../../lib/axios'
import { Transaction, DbTransaction } from '../types/transaction'
import { Category } from '../../../types/category'
import { AxiosResponse } from 'axios'

interface Meta {
  isMore: boolean
  txTotal: number
  txUncategorized: number
}

export interface UncategorizedTransactionsDbResponse {
  meta: Meta
  transactions: Array<DbTransaction>
  categories?: Array<Category>
}

export interface UncategorizedTransactionsResponse {
  meta: Meta
  transactions: Array<Transaction>
  categories?: Array<Category>
}

export const mapDbTxToTransaction = (dbTx: DbTransaction): Transaction => {
  const {
    id,
    third_party_tx_id: thirdPartyTxId,
    date_posted: dbDatePosted,
    amount: dbAmount,
    description,
    notes,
    type,
    bank_account_id: bankAccountId,
  } = dbTx
  const datePosted = new Date(dbDatePosted)
  const amount = Math.abs(Number(dbAmount.replace('$', '')))
  return {
    id,
    thirdPartyTxId,
    datePosted,
    amount,
    description,
    notes,
    type,
    bankAccountId,
  }
}

export const getUncategorizedTransactions = (
  includeCategories: boolean = false
): Promise<void | UncategorizedTransactionsResponse> => {
  let uri = '/getUncategorizedTransactions'
  if (includeCategories) {
    uri += '?include=categories'
  }
  // return axios.get<UncategorizedTransactionsDbResponse>(uri)
  return axios.get<UncategorizedTransactionsDbResponse>(uri).then((res) => {
    console.log('res:', res)
    const { meta, transactions: dbTransactions, categories } = res.data
    const transactions: Array<Transaction> = dbTransactions
      .map(mapDbTxToTransaction)
      .sort((a, b) => b.amount - a.amount)
    return {
      meta,
      transactions,
      categories,
    }
  })
}

// type QueryFnType = typeof getUncategorizedTransactions

// interface UseUncategorizedTransactionsOptions = {
//   config?: QueryConfig<QueryFnType>;
// };

export const useUncategorizedTransactions = () => {
  return useQuery({
    queryKey: ['uncategorizedTransactions'],
    queryFn: () => getUncategorizedTransactions(),
  })
}
