import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { changePassword } from '../api'
import messages from '../messages'

class ChangePassword extends Component {
  constructor () {
    super()

    this.state = {
      oldPassword: '',
      newPassword: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { alert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => alert(messages.changePasswordSuccess, 'success'))
      .then(() => history.push('/'))
      .catch(error => {
        console.error(error)
        this.setState({ oldPassword: '', newPassword: '' })
        alert(messages.changePasswordFailure, 'danger')
      })
  }

  render () {
    const { oldPassword, newPassword } = this.state

    const changePasswordFormJsx = (
      <Form
        className="auth-form"
        onSubmit={this.onChangePassword}>
        <h3 className="tuber-form-heading">Change Password</h3>
        <Form.Group controlId="oldpw">
          <Form.Label className="tuber-form-label">Old Password</Form.Label>
          <Form.Control
            required
            name="oldPassword"
            value={oldPassword}
            type="password"
            placeholder="Old Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="newPassword">
          <Form.Label className="tuber-form-label">New Password</Form.Label>
          <Form.Control
            required
            name="newPassword"
            value={newPassword}
            type="password"
            placeholder="New Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="btn-flex-end">
          <Link to='/'>
            <Button
              variant="primary-outline"
              type="submit"
              className="btn-mr">
              Cancel
            </Button>
          </Link>
          <Button
            variant="primary"
            type="submit"
            className="btn-ml">
            Change Password
          </Button>
        </Form.Group>
      </Form>
    )

    return (
      changePasswordFormJsx
    )
  }
}

export default withRouter(ChangePassword)
