import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AppLayout } from './AppLayout'
import reportWebVitals from './reportWebVitals'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import { Dashboard } from './routes/Dashboard'
import { Upload } from './routes/Upload'
import { Categorize } from './routes/Categorize'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<AppLayout />} errorElement={<ErrorPage />}>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/categorize" element={<Categorize />} />
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
