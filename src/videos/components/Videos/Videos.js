import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Container, Form, Row } from 'react-bootstrap'

import VideosCard from '../VideosCard/VideosCard'

import { getVideos } from '../../api'
import convertUrl from '../../convertUrl'

import './Videos.scss'

class Videos extends Component {
  constructor () {
    super()

    this.state = {
      videos: null,
      videosSearch: null,
      searchTerm: ''
    }
  }

  handleChange = event => {
    this.setState({ searchTerm: event.target.value })
    const filteredVideos = this.state.videos.filter(video => {
      return (
        video.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
        video.artist.toLowerCase().includes(event.target.value.toLowerCase()) ||
        video.album.toLowerCase().includes(event.target.value.toLowerCase()) ||
        video.description.toLowerCase().includes(event.target.value.toLowerCase())
      )
    })
    this.setState({
      videosSearch: filteredVideos
    })
  }

  componentDidMount () {
    let saveVideos
    getVideos(this.props.user)
      .then(response => {
        saveVideos = response.data.videos
        saveVideos.forEach(video => {
          video.url = convertUrl(video.url)
        })
        this.setState({ videos: saveVideos })
      })
      .catch(console.error)

    const { onGetSettings } = this.props
    onGetSettings()
  }

  render () {
    const { videos, searchTerm, videosSearch } = this.state

    if (videos === null) {
      return <p>Loading...</p>
    }

    return (
      <Fragment>
        <div className="videos-header">
          <h2 className="videos-header-text">
            Your Tubes
          </h2>
          <Form controlId="searchTerm">
            <Form.Control
              name="searchTerm"
              value={searchTerm}
              placeholder="Search Tubes"
              onChange={this.handleChange}
            />
          </Form>
          <Link to='/video-create'>
            <button className="add-tube-btn">+</button>
          </Link>
        </div>
        {videos.length === 0
          ? <Alert variant="primary">{'You haven\'t added any videos yet!'}</Alert>
          : ''
        }
        <Container>
          <Row className="videos-row">
            {videosSearch
              ? videosSearch.map(video => (
                <VideosCard
                  key={video._id}
                  video={video}
                />
              ))
              : videos.map(video => (
                <VideosCard
                  key={video._id}
                  video={video}
                />
              ))
            }
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Videos
