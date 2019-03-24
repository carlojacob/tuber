import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import { signIn } from '../api'
import messages from '../messages'

import '../../css/index.scss'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      username: '',
      password: ''
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignIn = event => {
    event.preventDefault()

    const { alert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => alert(messages.signInSuccess, 'success'))
      .then(() => history.push('/videos'))
      .catch(error => {
        console.error(error)
        this.setState({ email: '', username: '', password: '' })
        alert(messages.signInFailure, 'danger')
      })
  }

  componentDidUpdate () {
    if (this.state.username.includes('@') && this.state.username !== this.state.email) {
      this.setState({ email: this.state.username })
    }
    if (!this.state.username.includes('@') && this.state.email) {
      this.setState({ email: '' })
    }
  }

  render () {
    const { username, password } = this.state

    const signInFormJsx = (
      <Form
        className="auth-form"
        onSubmit={this.onSignIn}>
        <h3 className="tuber-form-heading">Sign In</h3>
        <Form.Group controlId="username">
          <Form.Label className="tuber-form-label">Email address or Username</Form.Label>
          <Form.Control
            required
            name="username"
            value={username}
            placeholder="Enter email or username"
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
            Sign In
          </Button>
        </Form.Group>
      </Form>
    )

    return (
      signInFormJsx
    )
  }
}

export default withRouter(SignIn)
