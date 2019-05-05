import React, { Component, Fragment } from 'react'
import { Dropdown, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Settings from '../settings/Settings'

import './Header.scss'

const tuberSmallLogo = require('./tuberSmallLogo.png')

class Header extends Component {
  render () {
    const { user, alert, settings, handleAutoplayChange, handleLoopChange } = this.props

    const authenticatedOptions = (
      <Fragment>
        <Link to="/videos">
          <Button variant="primary-outline">
            Your Tubes
          </Button>
        </Link>
        <Dropdown alignRight className="btn-ml btn-mr">
          <Dropdown.Toggle variant="primary-outline" id="account-dropdown">
          Settings
          </Dropdown.Toggle>
          <Dropdown.Menu className="my-dropdown-menu my-auth">
            <Settings
              user={user}
              alert={alert}
              settings={settings}
              handleAutoplayChange={handleAutoplayChange}
              handleLoopChange={handleLoopChange} />
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
      <Dropdown alignRight className="btn-ml">
        <Dropdown.Toggle variant="primary-outline" id="account-dropdown">
        Account
        </Dropdown.Toggle>
        <Dropdown.Menu className="my-dropdown-menu my-unauth">
          <Link className="auth-link" to="/sign-up">Sign Up</Link>
          <Link className="auth-link" to="/sign-in">Sign In</Link>
        </Dropdown.Menu>
      </Dropdown>
    )

    return (
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
  }
}

export default Header
