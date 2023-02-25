import React, { useState, useEffect, ChangeEvent } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'
import { TransactionTable } from '../../../components/TransactionTable'
import { Category } from '../../../types/category'
// import "./Categorize.css";

const { REACT_APP_TX_DATA_API: api } = process.env

interface CategorizePayload {
  newCategory?: string
  transactions: Array<string>
}

const getSimilarTxs = (tx: Transaction, txs: Array<Transaction>) => {
  return txs.filter((tf) => isTxSimilar(tf, tx))
}

const isTxSimilar = (a: Transaction, b: Transaction) => {
  if (a.id !== b.id) {
    if (a.description === b.description) {
      return true
    }
  }
  return false
}

export const CategorizeTransaction = () => {
  const { txId } = useParams()
  const data: { transactions: Array<Transaction> } = useOutletContext()
  const [tx, setTx] = useState<Transaction | null>(null)
  const [txIndex, setTxIndex] = useState<number>(0)
  const [similarTxs, setSimilarTxs] = useState<Array<Transaction>>([])
  const [selectedTxIds, setSelectedTxIds] = useState<Array<string>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [isMore, setIsMore] = useState<boolean>(false)

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [newCategory, setNewCategory] = useState<string>('')
  const [isBusy, setIsBusy] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const _txs = data?.transactions || []
    const _txIndex = _txs.findIndex((t) => t.id === txId)
    if (_txIndex === -1) {
      return
    }
    const _tx = _txs[_txIndex]
    const _similarTxs = getSimilarTxs(_tx, _txs)
    const _selectedTxIds = _similarTxs.map((stx) => stx.id)
    setTx(_tx)
    setTxIndex(_txIndex)
    setSimilarTxs(_similarTxs)
    setSelectedTxIds(_selectedTxIds)
  }, [])

  const handleTxToggle = (txId: string) => {
    const isSelected = selectedTxIds.includes(txId)
    console.log(
      'handleTxToggle - tx:',
      txId,
      'isSelected (current):',
      isSelected
    )
    if (isSelected) {
      setSelectedTxIds(selectedTxIds.filter((id) => id !== txId))
      return
    }
    setSelectedTxIds(selectedTxIds.concat(txId))
  }

  const handleNewCategoryChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setNewCategory(ev.target.value)
  }

  const handleNewCategory = () => {
    if (!tx) {
      return
    }

    setSuccessMessage(null)
    setErrorMessage(null)
    setIsBusy(true)

    const _txs = [tx.id].concat(selectedTxIds)
    const data: CategorizePayload = {
      transactions: _txs,
    }
    if (newCategory) {
      data.newCategory = newCategory
    }
    const headers = new Headers()
    headers.append('Content-Type', 'application/json; charset=utf-8')
    fetch(`${api}/categorizeTransaction`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((result) => {
        console.log('result:', result)
        if (result?.category) {
          setCategories(categories.concat(result?.category))
          setNewCategory('')
        }
      })
      .catch((error) => {
        setErrorMessage(error.message)
      })
      .finally(() => {
        setIsBusy(false)
      })
  }

  if (!tx) {
    return (
      <p>
        Transaction ID <strong>{txId}</strong> not found.
      </p>
    )
  }
  return (
    <div className="CategorizeTransaction">
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
            <input type="text" id="notes" readOnly={true} value={tx.notes} />
          </div>
          <label htmlFor="amount">Amount $</label>
          <input
            type="text"
            id="amount"
            readOnly={true}
            value={tx.amount.toFixed(2)}
          />
        </fieldset>
        {similarTxs.length > 0 && (
          <fieldset>
            <legend>Similar transactions</legend>
            <TransactionTable
              transactions={similarTxs}
              selectedTxIds={selectedTxIds}
              handleTxToggle={handleTxToggle}
            />
          </fieldset>
        )}
        <fieldset>
          <legend>Catgeorize</legend>
          {categories.length > 0 && (
            <div className="row">
              <div className="input-group">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="primary"
                    onClick={handleNewCategory}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div className="row">
            <div className="input-group">
              <label htmlFor="category">New category name</label>
              <input
                type="text"
                id="category"
                value={newCategory}
                autoComplete="off"
                onChange={handleNewCategoryChange}
              />
              <button
                type="button"
                className="primary"
                onClick={handleNewCategory}
              >
                Categorize
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
