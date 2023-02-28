import React from 'react'
import { Outlet } from 'react-router-dom'
import { useUncategorizedTransactions } from '../api/getUncategorizedTransactions'

export const Categorize = () => {
  const { isLoading, isSuccess, isError, data, error } =
    useUncategorizedTransactions()

  console.log('Categorize.render')
  return (
    <>
      <h1>Categorize</h1>
      {isLoading && <div className="spinner"></div>}
      {/* {isError && <p>Error: {error.message}</p>} */}
      {isSuccess && data && <Outlet context={data} />}
    </>
  )
}
