import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../api'
import messages from '../messages'

class SignOut extends Component {
  componentDidMount () {
    const { alert, history, clearUser, user, clearSettings } = this.props

    signOut(user)
      .finally(() => alert(messages.signOutSuccess, 'success'))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
      .finally(() => clearSettings())
  }

  render () {
    return ''
  }
}

export default withRouter(SignOut)
