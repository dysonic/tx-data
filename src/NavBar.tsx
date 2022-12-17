import React from 'react'
import { Link } from 'react-router-dom'
// import "./App.css";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/upload">Upload</Link>
        </li>
      </ul>
    </nav>
  )
}

export default NavBar
