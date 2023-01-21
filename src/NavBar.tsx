import React from 'react'
import { Link } from 'react-router-dom'
// import "./App.css";

function NavBar() {
  return (
    <nav>
      <Link to="/upload">Upload</Link>
      <Link to="/categorize">Categorize</Link>
    </nav>
  )
}

export default NavBar
