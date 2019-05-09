import React, { Component, Fragment } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Table, Button } from 'react-bootstrap'

import { getVideo, deleteVideo } from '../../api'
import convertUrl, { createEmbedUrl } from '../../convertUrl'
import messages from '../../messages'
import stringLimit from '../../stringLimit'

class Video extends Component {
  constructor () {
    super()

    this.state = {
      video: null,
      shouldRedirect: false,
      redirectPath: ''
    }
  }

  delVideo = props => {
    const { alert } = this.props

    deleteVideo(props)
      .then(response => this.setState({
        shouldRedirect: true,
        redirectPath: '/videos'
      }))
      .then(() => alert(messages.deleteVideoSuccess, 'success'))
      .catch(error => {
        this.setState({
          shouldRedirect: true,
          redirectPath: `/videos/${this.props.match.params.id}`
        })
        alert(messages.deleteVideoFailure, 'danger')
        console.error(error)
      })
  }

  componentDidMount () {
    const { alert, settings } = this.props

    if (this.props.selectedVideo === undefined) {
      getVideo(this.props)
        .then(response => this.setState({ video: response.data.video }))
        .then(() => this.setState({ video: {
          ...this.state.video,
          url: convertUrl(this.state.video.url, settings)
        }
        }))
        .then(() => {
          if (this.state.video.url === false) {
            alert(messages.rickError, 'danger')
          }
        })
        .catch(console.error)
    }
  }

  render () {
    const { video, shouldRedirect, redirectPath } = this.state

    if (shouldRedirect) {
      return <Redirect to={{
        pathname: redirectPath
      }} />
    }

    if (!(video || this.props.match.url.includes('search'))) {
      return <p>Loading...</p>
    }

    let artist, title, album, description, url

    const { selectedVideo } = this.props

    if (video) {
      artist = video.artist
      title = video.title
      album = video.album
      description = video.description
      url = video.url
    } else if (selectedVideo) {
      title = selectedVideo.snippet.title
      description = selectedVideo.snippet.description
      url = createEmbedUrl(selectedVideo.id.videoId, this.props.settings)
    }

    let urlRemoveSettings = ''
    if (url) {
      urlRemoveSettings = url.split('?autoplay')[0]
    }

    return (
      <Container>
        <Row className="video-show-margin">
          <Col sm={12} md={8} className="aspect-ratio">
            <div className="centered-video">
              <iframe
                className="full-video-dims"
                src={url || 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
                }
                allow="autoplay">
              </iframe>
            </div>
          </Col>
          <Col sm={12} md={4} className="centered-video-table">
            <Table bordered size="sm" className="video-show-table-margin">
              <tbody>
                <tr>
                  <th><p className="video-show video-head">Title:</p></th>
                  <td><p className="video-show video-text">{stringLimit(title, 60)}</p></td>
                </tr>
              </tbody>
              <tbody>
                {!(artist === undefined)
                  ? <Fragment>
                    <tr>
                      <th><p className="video-show video-head">Artist:</p></th>
                      <td><p className="video-show video-text">{stringLimit(artist, 60)}</p></td>
                    </tr>
                    <tr>
                      <th><p className="video-show video-head">Album:</p></th>
                      <td><p className="video-show video-text">{stringLimit(album, 60)}</p></td>
                    </tr>
                  </Fragment>
                  : null
                }
                <tr>
                  <th><p className="video-show video-head">Description:</p></th>
                  <td><p className="video-show video-text">{stringLimit(description, 150)}</p></td>
                </tr>
                <tr>
                  <th><p className="video-show video-head">URL:</p></th>
                  <td><p className="video-show video-text">
                    {url
                      ? <a
                        rel="noopener noreferrer"
                        target="_blank"
                        className="video-url-text"
                        href={urlRemoveSettings.replace('embed/', 'watch?v=')}>
                        {urlRemoveSettings.replace('embed/', 'watch?v=')}
                      </a>
                      : 'Invalid URL stored'
                    }
                  </p></td>
                </tr>
              </tbody>
            </Table>
            <div className={video ? 'video-btn-flex' : 'btn-flex-end'}>
              {video
                ? <Button
                  variant="primary-outline"
                  className="btn-mr"
                  onClick={() => this.delVideo(this.props)}>
                  Delete
                </Button>
                : null
              }
              <div className={video ? 'btn-flex-end' : ''}>
                <Link to={video ? '/videos' : '/video-search-youtube'}>
                  <Button variant="primary-outline" className="btn-mr">
                    Back
                  </Button>
                </Link>
                <Link to={video
                  ? `/videos/${this.props.match.params.id}/edit`
                  : '/video-create'}>
                  <Button variant="primary" className="btn-ml">{video ? 'Edit' : 'Save Tube'}</Button>
                </Link>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Video
