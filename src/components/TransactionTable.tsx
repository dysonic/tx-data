import React from 'react'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'

export const TransactionTable = (props: {
  title?: string
  transactions: Array<Transaction>
  selectedTxIds?: Array<string>
  handleTxToggle?(txId: string): void
}) => {
  const { title, transactions, selectedTxIds = [], handleTxToggle } = props

  return (
    <table className="striped">
      {title && <caption>{title}</caption>}
      <thead>
        <tr>
          {handleTxToggle && <th>&nbsp;</th>}
          <th>Date</th>
          <th>Type</th>
          <th>Description</th>
          <th>Notes</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr key={tx.id}>
            {handleTxToggle && (
              <td data-label="">
                <input
                  type="checkbox"
                  autoComplete="off"
                  checked={selectedTxIds.includes(tx.id)}
                  onChange={() => handleTxToggle(tx.id)}
                />
              </td>
            )}
            <td data-label="Date">{format(tx.datePosted, 'dd/MM/yyyy')}</td>
            <td data-label="Type">{tx.type}</td>
            <td data-label="Description">{tx.description}</td>
            <td data-label="Notes">{tx.notes}</td>
            <td data-label="Amount">{tx.amount.toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
