import React from 'react'
import logo from './logo.svg'
import './App.css'
import { createBrowserRouter, RouterProvider, Link } from 'react-router-dom'
import NavBar from './NavBar'
import { Dashboard } from './routes/Dashboard'
import { Upload } from './routes/Upload'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
])

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <Link to="/">TX-DATA</Link>
        </h1>
        <NavBar />
        <hr />
      </header>
      <main>
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default App
