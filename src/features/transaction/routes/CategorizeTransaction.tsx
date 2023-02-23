import React, { useState, useEffect, ChangeEvent } from 'react'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'
import { TransactionTable } from '../../../components/TransactionTable'
import { Category } from '../../../types/category'

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

interface CategorizePayload {
  newCategory?: string
  transactions: Array<string>
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

export const CategorizeTransaction = () => {
  const [transactions, setTransactions] = useState<Array<Transaction>>([])
  const [tx, setTx] = useState<Transaction | null>(null)
  const [similarTxs, setSimilarTxs] = useState<Array<Transaction>>([])
  const [selectedTxIds, setSelectedTxIds] = useState<Array<string>>([])
  const [categories, setCategories] = useState<Array<Category>>([])
  const [isMore, setIsMore] = useState<boolean>(false)
  const [txIndex, setTxIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const [newCategory, setNewCategory] = useState<string>('')
  const [isBusy, setIsBusy] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const getUncategorizedTransactions = async () => {
    setIsLoading(true)
    setError(null)
    try {
      let url = `${api}/getUncategorizedTransactions`
      const includeCategories = transactions.length === 0
      if (includeCategories) {
        url += '?include=categories'
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const {
        meta: { isMore },
        transactions: dbTransactions,
        categories,
      } = await response.json()
      setIsMore(isMore)
      const _txs = dbTransactions
        .map(mapDbTxToTransaction)
        .sort((a: Transaction, b: Transaction) => b.amount - a.amount)
      setTransactions(_txs)
      if (_txs.length) {
        const _tx = _txs[txIndex]
        setTx(_tx)
        const _similiarTxs = getSimilarTxs(_tx, _txs)
        setSimilarTxs(_similiarTxs)
        setSelectedTxIds(_similiarTxs.map((stx) => stx.id))
      }
      if (includeCategories) {
        setCategories(categories)
      }
    } catch (error) {
      console.error('Error:', error)
      setError(error as Error)
    } finally {
      setIsLoading(false)
    }
  }

  const getSimilarTxs = (_tx: Transaction, _txs: Array<Transaction>) => {
    return _txs.filter((tf) => isTxSimilar(tf, _tx))
  }

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

  console.log('isLoading;', isLoading, 'error:', error)

  // useEffect(() => {
  //   console.log('i fire once')
  //   getUncategorizedTransactions()
  // }, [])

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

  // return (
  //   <div className="Categorize">
  //     <h1>
  //       Categorize <small>Classify transactions</small>
  //     </h1>
  //     {tx && (
  //       <div className="tx">
  //         {/* {tx && JSON.stringify(tx)} */}
  //         <form>
  //           <fieldset>
  //             <legend>Transaction: #{txIndex + 1}</legend>
  //             <label htmlFor="date-posted">Date</label>
  //             <input
  //               type="text"
  //               id="date-posted"
  //               readOnly={true}
  //               value={format(tx.datePosted, 'dd/MM/yyyy')}
  //             />
  //             <label htmlFor="type">Type</label>
  //             <input type="text" id="type" readOnly={true} value={tx.type} />
  //             <div className="input-group vertical">
  //               <label htmlFor="description">Description</label>
  //               <input
  //                 type="text"
  //                 id="description"
  //                 readOnly={true}
  //                 value={tx.description}
  //               />
  //               <label htmlFor="notes">Notes</label>
  //               <input
  //                 type="text"
  //                 id="notes"
  //                 readOnly={true}
  //                 value={tx.notes}
  //               />
  //             </div>
  //             <label htmlFor="amount">Amount $</label>
  //             <input
  //               type="text"
  //               id="amount"
  //               readOnly={true}
  //               value={tx.amount.toFixed(2)}
  //             />
  //           </fieldset>
  //           {similarTxs.length > 0 && (
  //             <fieldset>
  //               <legend>Similar transactions</legend>
  //               <TransactionTable
  //                 transactions={similarTxs}
  //                 selectedTxIds={selectedTxIds}
  //                 handleTxToggle={handleTxToggle}
  //               />
  //             </fieldset>
  //           )}
  //           <fieldset>
  //             <legend>Catgeorize</legend>
  //             {categories.length > 0 && (
  //               <div className="row">
  //                 <div className="input-group">
  //                   {categories.map((cat) => (
  //                     <button
  //                       key={cat.id}
  //                       type="button"
  //                       className="primary"
  //                       onClick={handleNewCategory}
  //                     >
  //                       {cat.label}
  //                     </button>
  //                   ))}
  //                 </div>
  //               </div>
  //             )}
  //             <div className="row">
  //               <div className="input-group">
  //                 <label htmlFor="category">New category name</label>
  //                 <input
  //                   type="text"
  //                   id="category"
  //                   value={newCategory}
  //                   autoComplete="off"
  //                   onChange={handleNewCategoryChange}
  //                 />
  //                 <button
  //                   type="button"
  //                   className="primary"
  //                   onClick={handleNewCategory}
  //                 >
  //                   Categorize
  //                 </button>
  //               </div>
  //             </div>
  //           </fieldset>
  //         </form>
  //       </div>
  //     )}
  //   </div>
  // )

  return <h1>Categorize Transaction</h1>
}
