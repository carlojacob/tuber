import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { createVideo } from '../../api'
import messages from '../../messages'

import VideoForm from '../VideoForm/VideoForm'

class VideoCreateManual extends Component {
  constructor () {
    super()

    this.state = {
      artist: '',
      title: '',
      album: '',
      description: '',
      url: '',
      createdVideoId: null
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState(updatedField)
  }

  handleSubmit = event => {
    event.preventDefault()

    const { artist, title, album, description, url } = this.state

    const { alert } = this.props

    if ((artist.length === 0 &&
    title.length === 0 &&
    album.length === 0 &&
    description.length === 0) ||
    url.length === 0) {
      return alert(messages.createEditVideoInvalid, 'danger')
    }

    createVideo(this.props.user, this.state)
      .then(response => this.setState({ createdVideoId: response.data.video._id }))
      .catch(console.error)
  }

  render () {
    const { artist, title, album, description, url, createdVideoId } = this.state

    if (createdVideoId) {
      return <Redirect to={`/videos/${createdVideoId}`} />
    }

    const { handleChange, handleSubmit } = this

    return (
      <VideoForm
        video={{ artist, title, album, description, url }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
  }
}

export default VideoCreateManual
