import React, { useState, useEffect } from 'react'
// import { useQueryClient } from '@tanstack/react-query'
import { useUncategorizedTransactions } from '../api/getUncategorizedTransactions'
import { useNavigate } from 'react-router-dom'

export const Categorize = () => {
  const [txIndex, setTxIndex] = useState<number>(0)
  const navigate = useNavigate()

  // const queryClient = useQueryClient()

  // let query

  // useEffect(() => {
  //   console.log('i fire once')
  //   query = useUncategorizedTransactions()
  // }, [])

  const query = useUncategorizedTransactions()
  console.log('query.data:', query.data)

  if (query && query.data && query.data.transactions?.length > 0) {
    const tx = query.data.transactions[txIndex]
    navigate(`/categorize/${tx.id}`)
    return (
      <>
        <h1>Please wait...</h1>
      </>
    )
  }

  return (
    <>
      <h1>Categorize</h1>
    </>
  )
}
