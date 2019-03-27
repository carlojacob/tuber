import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'

import { getSettings, updateSettings } from './api'
import messages from './messages'

import '../header/Header.scss'

class Settings extends Component {
  constructor () {
    super()

    this.state = {
      settings: {
        autoplay: { checked: false },
        loop: { checked: false }
      }
    }
  }

  handleAutoplayChange = checked => {
    const updatedFields = {
      autoplay: { checked },
      loop: { checked: this.state.settings.loop.checked }
    }
    this.setState({ settings:
      { ...this.state.settings, ...updatedFields }
    })
    updateSettings(this.props.user, this.state.settings)
  }

  handleLoopChange = checked => {
    const updatedFields = {
      autoplay: { checked: this.state.settings.autoplay.checked },
      loop: { checked }
    }
    this.setState({ settings:
      { ...this.state.settings, ...updatedFields }
    })
    updateSettings(this.props.user, this.state.settings)
  }

  componentDidMount () {
    const { alert } = this.props

    getSettings(this.props.user)
      .then(response => this.setState({ settings: response.data.settings[0] }))
      .catch(error => {
        alert(messages.getSettingsFailure, 'danger')
        console.error(error)
      })
  }

  render () {
    const { settings } = this.state

    return (
      <Fragment>
        <label className="settings-switch">
          <span>Autoplay</span>
          <Switch
            name="checked"
            onChange={this.handleAutoplayChange}
            checked={settings.autoplay.checked}
            className="react-switch"
          />
        </label>
        <label className="settings-switch">
          <span>Loop</span>
          <Switch
            name="checked"
            onChange={this.handleLoopChange}
            checked={settings.loop.checked}
            className="react-switch"
          />
        </label>
      </Fragment>
    )
  }
}

export default Settings