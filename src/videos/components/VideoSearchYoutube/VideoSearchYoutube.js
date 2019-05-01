import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

import VideosCard from '../VideosCard/VideosCard'

import getYoutubeVideoData from './youtube-api'

class VideoSearchYoutube extends Component {
  constructor () {
    super()

    this.state = {
      youtubeSearchTerm: '',
      youtubeSearchResults: ''
    }
  }

  handleChange = event => {
    this.setState({ youtubeSearchTerm: event.target.value })
  }

  handleClick = event => {
    event.preventDefault()

    getYoutubeVideoData(this.state.youtubeSearchTerm)
      .then(response => {
        this.setState({ youtubeSearchResults: response.data.items })
      })
    // TODO: Empty search field on successful search only.
    this.setState({ youtubeSearchTerm: '' })
  }

  render () {
    const { youtubeSearchTerm, youtubeSearchResults } = this.state

    return (
      <Fragment>
        <div className="videos-header youtube-search-margin">
          <h2 className="videos-header-text m0">
            Search YouTube
          </h2>
          <Form.Group className="m0" controlId="youtubeSearchTerm">
            <Form.Control
              name="youtubeSearchTerm"
              value={youtubeSearchTerm}
              placeholder="Search"
              onChange={this.handleChange}
            />
          </Form.Group>
          <div>
            <Link to='/video-add'>
              <Button
                variant="primary-outline"
                className="btn-mr">
                Cancel
              </Button>
            </Link>
            <Button
              variant="primary"
              className="btn-ml"
              onClick={this.handleClick}>
              Search
            </Button>
          </div>
        </div>
        {youtubeSearchResults
          ? youtubeSearchResults.map(video => (
            <VideosCard
              key={video.id.videoId}
              video={video}
              url={`https://www.youtube.com/embed/${video.id.videoId}`}
            />
          ))
          : null
        }
      </Fragment>
    )
  }
}

export default VideoSearchYoutube
