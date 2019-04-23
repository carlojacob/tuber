import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Col } from 'react-bootstrap'

import stringLimit from '../../stringLimit'
import './VideosCard.scss'

const convertUrlToThumb = url => {
  return `https://img.youtube.com/vi/${url.split('embed/')[1]}/0.jpg`
}

const VideosCard = ({ video }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="video-col">
    <Link to={`/videos/${video._id}`} className="video-link">
      <Card className="video-wrapper">
        <Card.Img className="video-img" variant="top" src={video.url
          ? convertUrlToThumb(video.url)
          : 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg'
        }
        />
        <Card.Body className="video-details video-title-dims">
          <Card.Title className="video-title">{video.url
            ? stringLimit(video.title, 80)
            : <Fragment>
              {stringLimit(video.title, 55)}
              <span><br /><i>{'Haha!'}</i></span>
            </Fragment>}
          </Card.Title>
        </Card.Body>
        <ListGroup className="list-group-flush video-card-body">
          <ListGroupItem className="video-details video-artist-dims">
            <b>Artist:</b> {stringLimit(video.artist, 75)}
          </ListGroupItem>
          <ListGroupItem className="video-details video-album-dims">
            <b>Album:</b> {stringLimit(video.album, 73)}
          </ListGroupItem>
        </ListGroup>
        <Card.Body className="video-details video-description-dims">
          <Card.Text>
            <b>Description:</b> {stringLimit(video.description, 170)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
)

export default VideosCard
