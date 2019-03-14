import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Alert, Container, Row } from 'react-bootstrap'

import VideosCard from '../VideosCard/VideosCard'

import { getVideos } from '../../api'
import convertUrl from '../../convertUrl'

import './Videos.scss'

class Videos extends Component {
  constructor () {
    super()

    this.state = {
      videos: null
    }
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
  }

  render () {
    const { videos } = this.state

    if (videos === null) {
      return <p>Loading...</p>
    }

    return (
      <Fragment>
        <h3>
          Your Tubes
          <span>
            <Link to='/video-create'>
              <button>Add Tube</button>
            </Link>
          </span>
        </h3>
        {videos.length === 0
          ? <Alert variant="primary">{'You haven\'t added any videos yet!'}</Alert>
          : ''
        }
        <Container>
          <Row>
            {videos.map(video => (
              <VideosCard
                key={video._id}
                video={video}
              />
            ))}
          </Row>
        </Container>
      </Fragment>
    )
  }
}

export default Videos
