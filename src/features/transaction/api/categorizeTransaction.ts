import { useMutation } from '@tanstack/react-query'
import { axios } from '../../../lib/axios'
import { Category } from '../../../types/category'

interface CategorizeTransactionPayloadNewCategory {
  categoryLabel: string
  transactions: Array<string>
}

interface CategorizeTransactionPayloadExistingCategory {
  category: string
  transactions: Array<string>
}

export type CategorizeTransactionPayload =
  | CategorizeTransactionPayloadNewCategory
  | CategorizeTransactionPayloadExistingCategory

export interface CategorizeTransactionResponse {
  category: Category
}

export const categorizeTransaction = (
  payload: CategorizeTransactionPayload
) => {
  return axios
    .post<CategorizeTransactionResponse>('/categorizeTransaction', payload)
    .then((res) => {
      console.log('res:', res)
      if (res.status === 200) {
        return res.data
      }
      return null
    })
}

export const useCategorizeTransaction = () => {
  return useMutation({
    mutationFn: categorizeTransaction,
  })
}
