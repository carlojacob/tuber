import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { getVideo, updateVideo } from '../../api'
import messages from '../../messages'

import VideoForm from '../VideoForm/VideoForm'

class VideoEdit extends Component {
  constructor () {
    super()

    this.state = {
      video: null,
      shouldRedirect: false,
      redirectPath: ''
    }
  }

  handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    this.setState({ video: { ...this.state.video, ...updatedField } })
  }

  handleSubmit = event => {
    event.preventDefault()

    const { artist, title, album, description, url } = this.state.video

    const { alert } = this.props

    if ((artist.length === 0 &&
    title.length === 0 &&
    album.length === 0 &&
    description.length === 0) ||
    url.length === 0) {
      return alert(messages.createEditVideoInvalid, 'danger')
    }

    updateVideo(this.props, this.state.video)
      .then(response => this.setState({
        shouldRedirect: true,
        redirectPath: `/videos/${this.props.match.params.id}`
      }))
      .catch(error => console.error(error))
  }

  componentDidMount () {
    getVideo(this.props)
      .then(response => this.setState({ video:
        {
          artist: response.data.video.artist,
          title: response.data.video.title,
          album: response.data.video.album,
          description: response.data.video.description,
          url: response.data.video.url
        }
      }))
      .catch(error => {
        this.setState({
          shouldRedirect: true,
          redirectPath: '/videos'
        })
        alert(messages.getVideoFailure, 'danger')
        console.error(error)
      })
  }

  render () {
    const { handleChange, handleSubmit } = this
    const { video, shouldRedirect, redirectPath } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: redirectPath
      }} />
    }

    if (!video) {
      return <p>Loading...</p>
    }

    return (
      <VideoForm
        video={video}
        videoId={this.props.match.params.id}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
  }
}

export default VideoEdit
