import React from 'react'
import format from 'date-fns/format'
import { Transaction } from '../types/transaction'

export const TransactionTable = (props: {
  title: string
  transactions: Array<Transaction>
}) => {
  const { title, transactions } = props
  return (
    <table className="striped">
      <caption>{title}</caption>
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Description</th>
          <th>Notes</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map((tx) => (
          <tr>
            <td data-label="Date">{format(tx.datePosted, 'dd/MM/yyyy')}</td>
            <td data-label="Type">{tx.type}</td>
            <td data-label="Description">{tx.description}</td>
            <td data-label="Notes">{tx.notes}</td>
            <td data-label="Amount">{tx.amount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
