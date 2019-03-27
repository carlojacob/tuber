import React, { Component, Fragment } from 'react'
import Switch from 'react-switch'

import '../header/Header.scss'

class Settings extends Component {
  render () {
    const { settings, handleAutoplayChange, handleLoopChange } = this.props

    return (
      <Fragment>
        <label className="settings-switch">
          <span>Autoplay</span>
          <Switch
            name="checked"
            onChange={handleAutoplayChange}
            checked={settings.autoplay.checked}
            className="react-switch"
          />
        </label>
        <label className="settings-switch">
          <span>Loop</span>
          <Switch
            name="checked"
            onChange={handleLoopChange}
            checked={settings.loop.checked}
            className="react-switch"
          />
        </label>
      </Fragment>
    )
  }
}

export default Settings
