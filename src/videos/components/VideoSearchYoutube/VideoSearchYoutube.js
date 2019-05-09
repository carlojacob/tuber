import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Container, Row, Form, Button } from 'react-bootstrap'

import VideosCard from '../VideosCard/VideosCard'

import getYoutubeVideoData from './youtube-api'
import messages from '../../messages'

class VideoSearchYoutube extends Component {
  constructor () {
    super()

    this.state = {
      youtubeSearchTerm: ''
    }
  }

  handleChange = event => {
    this.setState({ youtubeSearchTerm: event.target.value })
  }

  handleClick = event => {
    event.preventDefault()

    const { alert, setYoutubeSearchResults } = this.props

    getYoutubeVideoData(this.state.youtubeSearchTerm)
      .then(response => setYoutubeSearchResults(response.data.items))
      .then(() => this.setState({ youtubeSearchTerm: '' }))
      .catch(error => {
        alert(messages.getYoutubeVideoDataFailure, 'danger')
        console.error(error)
      })
  }

  handlePressEnter = event => {
    if (event.key === 'Enter') {
      this.handleClick(event)
    }
  }

  render () {
    const { youtubeSearchTerm } = this.state
    const { youtubeSearchResults, setSelectedVideo, clearYoutubeResults } = this.props

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
              onKeyPress={this.handlePressEnter}
            />
          </Form.Group>
          <div>
            <Link to='/video-add'>
              <Button
                variant="primary-outline"
                className="btn-mr"
                onClick={clearYoutubeResults}>
                {youtubeSearchResults ? 'Back' : 'Cancel'}
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
        <Container>
          <Row className="videos-row">
            {youtubeSearchResults
              ? youtubeSearchResults.map(video => (
                <VideosCard
                  key={video.id.videoId}
                  video={video}
                  setSelectedVideo={setSelectedVideo}
                />
              ))
              : null
            }
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default VideoSearchYoutube
