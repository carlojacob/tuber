import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { Alert } from 'react-bootstrap'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import HomeLogo from './homeLogo/HomeLogo'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Videos from './videos/components/Videos/Videos'
import Video from './videos/components/Video/Video'
import VideoAdd from './videos/components/VideoAdd/VideoAdd'
import VideoSearchYoutube from './videos/components/VideoSearchYoutube/VideoSearchYoutube'
import VideoCreate from './videos/components/VideoCreate/VideoCreate'
import VideoEdit from './videos/components/VideoEdit/VideoEdit'

import './App.scss'
import './videos/components/Video/Video.scss'
import './videos/components/VideoAdd/VideoAdd.scss'
import './videos/components/Videos/Videos.scss'
import './videos/components/VideosCard/VideosCard.scss'
import './videos/components/VideoSearchYoutube/VideoSearchYoutube.scss'

import { getSettings, updateSettings, createSettings } from './settings/api'
import messages from './settings/messages'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: [],
      settings: {
        autoplay: { checked: false },
        loop: { checked: false }
      },
      youtubeSearchResults: null,
      selectedVideo: null
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  clearSettings = () => this.setState({
    settings: {
      autoplay: { checked: false },
      loop: { checked: false }
    }
  })

  clearYoutubeResults = () => this.setState({
    youtubeSearchResults: null,
    selectedVideo: null
  })

  alert = (message, type) => {
    this.setState({ alerts: [...this.state.alerts, { message, type, fade: false }] })
    setTimeout(() => {
      this.setState(prevState => ({
        alerts: prevState.alerts.map(alert => ({
          message: alert.message,
          type: alert.type,
          fade: true
        }))
      }))
    }, 3000)
    setTimeout(() => {
      this.setState(prevState => ({ alerts: prevState.alerts.slice(1) }))
    }, 4000)
  }

  // Function to create default user settings on sign up
  onCreateSettings = () => {
    createSettings(this.state.user)
      .then(response => this.setState({ settings: response.data.setting }))
  }

  // Function for loading user settings.
  onGetSettings = () => {
    getSettings(this.state.user)
      .then(response => this.setState({ settings: response.data.settings[0] }))
      .catch(error => {
        this.alert(messages.getSettingsFailure, 'danger')
        console.error(error)
      })
  }

  // Functions for updating user settings.
  handleAutoplayChange = checked => {
    const updatedFields = {
      autoplay: { checked },
      loop: { checked: this.state.settings.loop.checked }
    }
    this.setState({ settings:
      { ...this.state.settings, ...updatedFields }
    })
    updateSettings(this.state.user, this.state.settings)
  }

  handleLoopChange = checked => {
    const updatedFields = {
      autoplay: { checked: this.state.settings.autoplay.checked },
      loop: { checked }
    }
    this.setState({ settings:
      { ...this.state.settings, ...updatedFields }
    })
    updateSettings(this.state.user, this.state.settings)
  }

  // Function for storing YouTube search results in state
  setYoutubeSearchResults = youtubeSearchResults => {
    this.setState({ youtubeSearchResults })
  }

  // Function for storing the selected YouTube search result in state
  setSelectedVideo = id =>
    this.setState({ selectedVideo:
      this.state.youtubeSearchResults.find(searchResult =>
        searchResult.id.videoId === id)
    })

  render () {
    const { alerts, user } = this.state

    const https = require('https')
    // https.get('https://tuber-ccj.herokuapp.com')
    https.get('https://tuber-api.onrender.com')

    return (
      <Fragment>
        <Header
          user={user}
          alert={this.alert}
          settings={this.state.settings}
          handleAutoplayChange={this.handleAutoplayChange}
          handleLoopChange={this.handleLoopChange}
          clearYoutubeResults={this.clearYoutubeResults} />
        {alerts.map((alert, index) => (
          <Alert className={alert.fade ? 'fade-out' : ''}key={index} dismissible variant={alert.type}>
            <Alert.Heading>
              {alert.message}
            </Alert.Heading>
          </Alert>
        ))}
        <main className="container">
          <Route exact path='/' render={() => (
            <HomeLogo alert={this.alert} />
          )} />

          <Route path='/sign-up' render={() => (
            <SignUp
              alert={this.alert}
              setUser={this.setUser}
              onCreateSettings={this.onCreateSettings} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut
              alert={this.alert}
              clearUser={this.clearUser}
              user={user}
              clearSettings={this.clearSettings} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/videos' render={() => (
            <Videos
              alert={this.alert}
              user={user}
              onGetSettings={this.onGetSettings} />
          )} />
          <AuthenticatedRoute user={user} exact path='/videos/:id' render={({ match }) => (
            <Video
              alert={this.alert}
              user={user}
              settings={this.state.settings}
              match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/video-add' render={() => (
            <VideoAdd />
          )} />
          <AuthenticatedRoute user={user} exact path='/video-search-youtube' render={() => (
            <VideoSearchYoutube
              alert={this.alert}
              user={user}
              setYoutubeSearchResults={this.setYoutubeSearchResults}
              youtubeSearchResults={this.state.youtubeSearchResults}
              setSelectedVideo={this.setSelectedVideo}
              clearYoutubeResults={this.clearYoutubeResults} />
          )} />
          <AuthenticatedRoute user={user} exact path='/video-search-youtube/:id' render={({ match }) => (
            <Video
              alert={this.alert}
              user={user}
              settings={this.state.settings}
              match={match}
              selectedVideo={this.state.selectedVideo} />
          )} />
          <AuthenticatedRoute user={user} exact path='/video-create' render={() => (
            <VideoCreate
              alert={this.alert}
              user={user}
              selectedVideo={this.state.selectedVideo}
              clearYoutubeResults={this.clearYoutubeResults} />
          )} />
          <AuthenticatedRoute user={user} exact path='/videos/:id/edit' render={({ match }) => (
            <VideoEdit alert={this.alert} user={user} match={match} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
