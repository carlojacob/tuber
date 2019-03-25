import React, { Fragment } from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Settings from '../settings/Settings'

import './Header.scss'

const tuberSmallLogo = require('./tuberSmallLogo.png')

const authenticatedOptions = (
  <Fragment>
    <Link to="/videos">Your Tubes</Link>
    <Dropdown alignRight className="btn-mr">
      <Dropdown.Toggle variant="primary-outline" id="account-dropdown">
        Settings
      </Dropdown.Toggle>
      <Dropdown.Menu className="my-dropdown-menu my-auth">
        <Settings />
      </Dropdown.Menu>
    </Dropdown>
    <Dropdown alignRight className="btn-ml">
      <Dropdown.Toggle variant="primary-outline" id="account-dropdown">
        Account
      </Dropdown.Toggle>
      <Dropdown.Menu className="my-dropdown-menu my-auth">
        <Link className="auth-link" to="/change-password">Change Password</Link>
        <Link className="auth-link" to="/sign-out">Sign Out</Link>
      </Dropdown.Menu>
    </Dropdown>
  </Fragment>
)

const unauthenticatedOptions = (
  <Dropdown alignRight>
    <Dropdown.Toggle variant="primary-outline" id="account-dropdown">
      Account
    </Dropdown.Toggle>
    <Dropdown.Menu className="my-dropdown-menu my-unauth">
      <Link className="auth-link" to="/sign-up">Sign Up</Link>
      <Link className="auth-link" to="/sign-in">Sign In</Link>
    </Dropdown.Menu>
  </Dropdown>
)

const Header = ({ user }) => (
  <header className="main-header">
    <div>
      <Link to="/">
        <img className="header-logo" src={tuberSmallLogo} title="tuberSmallLogo" />
      </Link>
    </div>
    <nav>
      { user && <span className="welcome">Welcome, <em>{user.username}</em>!</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
