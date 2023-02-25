import React, { useEffect } from 'react'
import { useOutletContext, useNavigate } from 'react-router-dom'
import { Transaction } from '../types/transaction'

export const AutoSelectTx = () => {
  const navigate = useNavigate()
  const data: { transactions: Array<Transaction> } = useOutletContext()

  useEffect(() => {
    if (data?.transactions?.length) {
      const tx = data.transactions[0]
      navigate(`/categorize/${tx.id}`)
    }
  }, [])

  return <div className="spinner"></div>
}
