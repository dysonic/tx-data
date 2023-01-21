import React, { useState, useEffect, ChangeEvent } from 'react'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'
import { TransactionTable } from '../components/TransactionTable'

// import "./Categorize.css";

const { REACT_APP_TX_DATA_API: api } = process.env

interface DbTransaction {
  id: string
  third_party_tx_id: string
  date_posted: string
  amount: string
  description: string
  notes: string
  type: string
  bank_account_id: string
}

export const mapDbTxToTransaction = (dbTx: DbTransaction) => {
  const {
    id,
    third_party_tx_id: thirdPartyTxId,
    date_posted: dbDatePosted,
    amount: dbAmount,
    description,
    notes,
    type,
  } = dbTx
  const datePosted = Date.parse(dbDatePosted)
  const amount = Math.abs(Number(dbAmount.replace('$', '')))
  return {
    id,
    thirdPartyTxId,
    datePosted,
    amount,
    description,
    notes,
    type,
  }
}

export const isTxSimilar = (a: Transaction, b: Transaction) => {
  if (a.id !== b.id) {
    if (a.description === b.description) {
      return true
    }
  }
  return false
}

export const Categorize = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [isMore, setIsMore] = useState<boolean>(false)
  const [txIndex, setTxIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [newCategory, setNewCategory] = useState<string>('')

  const getUncategorizedTransactions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`${api}/getUncategorizedTransactions`)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const {
        meta: { isMore },
        transactions: dbTransactions,
      } = await response.json()
      setIsMore(isMore)
      const txs = dbTransactions
        .map(mapDbTxToTransaction)
        .sort((a: Transaction, b: Transaction) => b.amount - a.amount)
      setTransactions(txs)
    } catch (error) {
      console.error('Error:', error)
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleNewCategoryChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(ev.target.value)
  }

  console.log('isLoading;', isLoading, 'error:', error)

  useEffect(() => {
    console.log('i fire once')
    getUncategorizedTransactions()
  }, [])

  const tx = transactions.length ? transactions[txIndex] : null
  const similarTxs =
    transactions.length && tx
      ? transactions.filter((tf) => isTxSimilar(tf, tx))
      : []

  return (
    <div className="Categorize">
      <h1>
        Categorize <small>Classify transactions</small>
      </h1>
      {tx && (
        <div className="tx">
          {/* {tx && JSON.stringify(tx)} */}
          <form>
            <fieldset>
              <legend>Transaction: #{txIndex + 1}</legend>
              <label htmlFor="date-posted">Date</label>
              <input
                type="text"
                id="date-posted"
                readOnly={true}
                value={format(tx.datePosted, 'dd/MM/yyyy')}
              />
              <label htmlFor="type">Type</label>
              <input type="text" id="type" readOnly={true} value={tx.type} />
              <div className="input-group vertical">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  readOnly={true}
                  value={tx.description}
                />
                <label htmlFor="notes">Notes</label>
                <input
                  type="text"
                  id="notes"
                  readOnly={true}
                  value={tx.notes}
                />
              </div>
              <label htmlFor="amount">Amount $</label>
              <input
                type="text"
                id="amount"
                readOnly={true}
                value={tx.amount.toFixed(2)}
              />
              {similarTxs.length > 0 && (
                <TransactionTable
                  title="Similar transactions"
                  transactions={similarTxs}
                />
              )}
              <div className="container">
                <div className="row">
                  <div className="input-group">
                    <label htmlFor="category">New category</label>
                    <input
                      type="text"
                      id="category"
                      value={newCategory}
                      onChange={handleNewCategoryChange}
                    />
                    <button className="primary">Categorize</button>
                  </div>
                </div>
              </div>
            </fieldset>
          </form>
        </div>
      )}
    </div>
  )
}
