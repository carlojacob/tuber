import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { signUp, signIn } from '../api'
import messages from '../messages'

class SignUp extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    if (this.state.username.includes('@')) {
      return alert(messages.usernameInvalid, 'danger')
    }

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signUpSuccess, 'success'))
      .then(() => history.push('/videos'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', username: '', password: '', passwordConfirmation: '' })
        alert(messages.signUpFailure, 'danger')
      })
  }

  render () {
    const { email, username, password, passwordConfirmation } = this.state

    const signUpFormJsx = (
      <Form
        className="auth-form"
        onSubmit={this.onSignUp}>
        <h3 className="tuber-form-heading">Sign Up</h3>
        <Form.Group controlId="email">
          <Form.Label className="tuber-form-label">Email address</Form.Label>
          <Form.Control
            required
            name="email"
            value={email}
            type="email"
            placeholder="Enter email"
            onChange={this.handleChange}
          />
          <Form.Text className="text-muted">
            {'We\'ll never share your email with anyone else.'}
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="username">
          <Form.Label className="tuber-form-label">Username</Form.Label>
          <Form.Control
            required
            name="username"
            value={username}
            placeholder="Username (may not contain '@' symbol)"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="password">
          <Form.Label className="tuber-form-label">Password</Form.Label>
          <Form.Control
            required
            name="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group controlId="passwordConfirmation">
          <Form.Label className="tuber-form-label">Confirm Password</Form.Label>
          <Form.Control
            required
            name="passwordConfirmation"
            value={passwordConfirmation}
            type="password"
            placeholder="Confirm Password"
            onChange={this.handleChange}
          />
        </Form.Group>

        <Form.Group className="btn-flex-end">
          <Link to='/'>
            <Button
              variant="primary-outline"
              className="btn-mr">
              Cancel
            </Button>
          </Link>
          <Button
            variant="primary"
            type="submit"
            className="btn-ml">
            Sign Up
          </Button>
        </Form.Group>
      </Form>
    )

    return (
      signUpFormJsx
    )
  }
}

export default withRouter(SignUp)
