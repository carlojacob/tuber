import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const tuberSmallLogo = require('./tuberSmallLogo.png')

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/videos">Videos</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <div>
      <img className="header-logo" src={tuberSmallLogo} title="tuberSmallLogo" />
    </div>
    <nav>
      { user && <span className="welcome">Welcome, <em>{user.username}</em></span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
      { alwaysOptions }
    </nav>
  </header>
)

export default Header
