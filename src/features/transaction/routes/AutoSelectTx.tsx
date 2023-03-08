import React, { useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { Transaction } from '../types/transaction'

export const AutoSelectTx = () => {
  const navigate = useNavigate()
  const data: { transactions: Array<Transaction> } = useOutletContext()

  console.log('AutoSelectTx.render')
  // console.log(Object.keys(data))
  console.log(data?.transactions?.length)

  useEffect(() => {
    if (data?.transactions?.length) {
      const tx = data.transactions[0]
      navigate(tx.id, { replace: true })
    }
  }, [])

  return <div className="spinner"></div>
}
