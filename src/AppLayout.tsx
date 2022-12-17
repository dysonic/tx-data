import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export const AppLayout = () => (
  <>
    <header className="App-header">
      <h1>
        <Link to="/">TX-DATA</Link>
      </h1>
      <NavBar />
      <hr />
    </header>
    <main>
      <Outlet />
    </main>
  </>
)
