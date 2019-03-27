import React, { Component, Fragment } from 'react'
import './App.scss'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from './auth/components/AuthenticatedRoute'
import Header from './header/Header'
import HomeLogo from './homeLogo/HomeLogo'
import SignUp from './auth/components/SignUp'
import SignIn from './auth/components/SignIn'
import SignOut from './auth/components/SignOut'
import ChangePassword from './auth/components/ChangePassword'

import Videos from './videos/components/Videos/Videos'
import Video from './videos/components/Video/Video'
import VideoCreate from './videos/components/VideoCreate/VideoCreate'
import VideoEdit from './videos/components/VideoEdit/VideoEdit'

import Alert from 'react-bootstrap/Alert'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      alerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

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
    }, 1000)
    setTimeout(() => {
      this.setState(prevState => ({ alerts: prevState.alerts.slice(1) }))
    }, 2000)
  }

  render () {
    const { alerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} alert={this.alert} />
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
            <SignUp alert={this.alert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn alert={this.alert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut alert={this.alert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword alert={this.alert} user={user} />
          )} />

          <AuthenticatedRoute user={user} exact path='/videos' render={() => (
            <Videos alert={this.alert} user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/videos/:id' render={({ match }) => (
            <Video alert={this.alert} user={user} match={match} />
          )} />
          <AuthenticatedRoute user={user} exact path='/video-create' render={() => (
            <VideoCreate alert={this.alert} user={user} />
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
