import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import NavBar from './NavBar'

export const AppLayout = () => {
  return (
    <div className="container">
      <header>
        {/* <NavBar /> */}
        <Link className="logo" to="/">
          TX-DATA
        </Link>
        <Link className="button" to="/upload">
          Upload
        </Link>
        <Link className="button" to="/categorize">
          Categorize
        </Link>
        <hr />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  )
}
