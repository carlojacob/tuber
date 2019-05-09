import React, { Component } from 'react'
import { Redirect } from 'react-router'

import { createVideo } from '../../api'
import messages from '../../messages'

import VideoForm from '../VideoForm/VideoForm'

class VideoCreate extends Component {
  constructor () {
    super()

    this.state = {
      artist: '',
      title: '',
      album: '',
      description: '',
      url: '',
      youtubeId: '',
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

  componentDidMount () {
    const { selectedVideo } = this.props

    if (selectedVideo) {
      this.setState({ title: selectedVideo.snippet.title })
      this.setState({ description: selectedVideo.snippet.description })
      this.setState({ url:
        `https://www.youtube.com/watch?v=${selectedVideo.id.videoId}`
      })
      this.setState({ youtubeId: selectedVideo.id.videoId })
    }
  }

  render () {
    const { artist, title, album, description, url, youtubeId, createdVideoId } = this.state

    if (createdVideoId) {
      return <Redirect to={`/videos/${createdVideoId}`} />
    }

    const { handleChange, handleSubmit } = this

    let isFromYoutube = false
    if (this.props.selectedVideo) {
      isFromYoutube = true
    }

    return (
      <VideoForm
        video={{ artist, title, album, description, url, youtubeId }}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        isFromYoutube={isFromYoutube}
      />
    )
  }
}

export default VideoCreate
