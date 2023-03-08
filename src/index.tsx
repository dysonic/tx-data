import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppLayout } from './AppLayout'
import reportWebVitals from './reportWebVitals'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './lib/react-query'
import { ErrorPage } from './ErrorPage'
import { Dashboard } from './routes/Dashboard'
import { Upload } from './routes/Upload'
import { Categorize } from './features/transaction/routes/Categorize'
import { AutoSelectTx } from './features/transaction/routes/AutoSelectTx'
import { CategorizeTransaction } from './features/transaction/routes/CategorizeTransaction'
import { getUncategorizedTransactions } from './features/transaction/api/getUncategorizedTransactions'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      {/* <Route path="/categorize/:txId" element={<CategorizeTransaction />} /> */}
      {/* <Route path="/categorize" element={<Categorize />} /> */}
      <Route
        path="/categorize"
        element={<Categorize />}
        loader={async () => {
          console.log('> loader')
          // const data = await getUncategorizedTransactions()
          await queryClient.prefetchQuery(['uncategorizedTransactions'], () =>
            getUncategorizedTransactions(true)
          )
          return queryClient.getQueryData(['uncategorizedTransactions'])
        }}
      >
        <Route path=":txId" element={<CategorizeTransaction />} />
        <Route path="" element={<AutoSelectTx />} />
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
