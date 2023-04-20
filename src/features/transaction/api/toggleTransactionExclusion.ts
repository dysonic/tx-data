import { useMutation } from '@tanstack/react-query'
import { axios } from '../../../lib/axios'

export interface ToggleTransactionExclusionPayload {
  isExcluded: boolean
  transactions: Array<string>
}

export const toggleTransactionExclusion = (
  payload: ToggleTransactionExclusionPayload
) => {
  return axios.post<ToggleTransactionExclusionPayload>(
    '/toggleTransactionExclusion',
    payload
  )
}

export const useToggleTransactionExclusion = () => {
  return useMutation({
    mutationFn: toggleTransactionExclusion,
  })
}
