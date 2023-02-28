import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'
import { useOutletContext, useParams, useNavigate } from 'react-router-dom'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'
import { TransactionTable } from '../../../components/TransactionTable'
import { Category } from '../../../types/category'
import {
  useCategorizeTransaction,
  CategorizeTransactionPayload,
} from '../api/categorizeTransaction'
// import { categorizeTransaction } from '../api/categorizeTransaction'
// import { useMutation } from '@tanstack/react-query'
import { Meta } from '../api/getUncategorizedTransactions'
// import "./Categorize.css";

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
  const data: {
    transactions: Array<Transaction>
    categories: Array<Category>
    meta: Meta
  } = useOutletContext()
  const [tx, setTx] = useState<Transaction | null>(null)
  const [txIndex, setTxIndex] = useState<number>(0)
  const [similarTxs, setSimilarTxs] = useState<Array<Transaction>>([])
  const [selectedTxIds, setSelectedTxIds] = useState<Array<string>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [hasPrevious, setHasPrevious] = useState<boolean>(false)
  const [hasNext, setHasNext] = useState<boolean>(false)
  const [newCategoryLabel, setNewCategoryLabel] = useState<string>('')
  const mutation = useCategorizeTransaction()
  const navigate = useNavigate()
  // const mutation = useMutation({
  //   mutationFn: categorizeTransaction,
  //   onSuccess: (data, variables, context) => {

  //   },
  // })

  useEffect(() => {
    console.log('useEffect: set up - #txs', data.transactions.length)
    const _txs = data?.transactions || []
    if (!txId) {
      return
    }
    const _txIndex = _txs.findIndex((t) => t.id === txId)
    if (_txIndex === -1) {
      return
    }
    const _tx = _txs[_txIndex]
    const _similarTxs = getSimilarTxs(_tx, _txs)
    const _selectedTxIds = _similarTxs.map((stx) => stx.id)
    const _categories = data?.categories || []
    const _hasPrev = _txIndex > 0
    const _hasNext = _txIndex + 1 < _txs.length || data.meta.isMore
    setTx(_tx)
    setTxIndex(_txIndex)
    setSimilarTxs(_similarTxs)
    setSelectedTxIds(_selectedTxIds)
    setCategories(_categories)
    setHasPrevious(_hasPrev)
    setHasNext(_hasNext)
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

  const handleCategoryClick = (category: Category) => {
    const payload = {
      category: category.id,
      transactions: [txId as string].concat(selectedTxIds),
    }
    doCategorizeMutationAndHandleResponse(payload)
  }

  const handleNewCategory = () => {
    const payload = {
      categoryLabel: newCategoryLabel,
      transactions: [txId as string].concat(selectedTxIds),
    }
    doCategorizeMutationAndHandleResponse(payload)
  }

  const doCategorizeMutationAndHandleResponse = async (
    payload: CategorizeTransactionPayload
  ) => {
    try {
      const resp = await mutation.mutateAsync(payload)

      // Add new category (as appropriate)
      if (resp) {
        setCategories(categories.concat(resp.category))
        setNewCategoryLabel('')
      }

      navigateToNextTransaction(true)
    } catch (error) {
      console.error(error)
    }
  }

  const navigateToNextTransaction = (skipSelected: boolean) => {
    const nextTxIndex = txIndex + 1
    if (nextTxIndex < data.transactions.length) {
      const nextTxs = data.transactions.slice(nextTxIndex)
      const nextTx = skipSelected
        ? nextTxs.find((t) => !selectedTxIds.includes(t.id))
        : nextTxs[0]

      // If we have another tx to categorize go to that page
      if (nextTx) {
        navigate(`/categorize/${nextTx.id}`)
        return
      }

      // Are there any more uncategorized transactions? Fetch them.
      if (data.meta.isMore) {
        navigate('/categorize')
        return
      }

      // Otherwise go to home page.
      navigate('/')
      return
    }
  }

  const navigateToPreviousTransaction = () => {
    const prevTx = data.transactions[txIndex - 1]
    navigate(`/categorize/${prevTx.id}`)
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
          <legend>Assign category</legend>
          {categories.length > 0 && (
            <div className="row">
              <div className="input-group">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="primary"
                    disabled={mutation.isLoading}
                    onClick={(ev: MouseEvent<HTMLButtonElement>) => {
                      handleCategoryClick(cat)
                    }}
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
                id="categoryLabel"
                value={newCategoryLabel}
                autoComplete="off"
                onChange={(ev: ChangeEvent<HTMLInputElement>) => {
                  setNewCategoryLabel(ev.target.value)
                }}
              />
              <button
                type="button"
                className="primary"
                disabled={mutation.isLoading}
                onClick={handleNewCategory}
              >
                Categorize
              </button>
            </div>
          </div>
        </fieldset>
        <div className="row">
          <button
            disabled={!hasPrevious}
            onClick={(ev: MouseEvent<HTMLButtonElement>) => {
              navigateToPreviousTransaction()
            }}
          >
            Previous
          </button>
          <button
            disabled={!hasNext}
            onClick={(ev: MouseEvent<HTMLButtonElement>) => {
              navigateToNextTransaction(false)
            }}
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}
