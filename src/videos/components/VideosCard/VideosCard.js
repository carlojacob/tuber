import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Card, ListGroup, ListGroupItem, Col } from 'react-bootstrap'

import stringLimit from '../../stringLimit'
import replaceQuotes from '../../replaceQuotes'

const convertUrlToThumb = url => {
  return `https://img.youtube.com/vi/${url.split('embed/')[1]}/0.jpg`
}

const VideosCard = ({ video }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="video-col">
    <Link to={video._id
      ? `/videos/${video._id}`
      : '/video-show-youtube'}
    className="video-link"
    >
      <Card className="video-wrapper">
        <Card.Img className="video-img" variant="top" src={video.url
          ? convertUrlToThumb(video.url)
          : (video._id ? 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg' : `https://img.youtube.com/vi/${video.id.videoId}/0.jpg`)
        }
        />
        <Card.Body className="video-details video-title-dims">
          <Card.Title className="video-title">{video.url
            ? stringLimit(replaceQuotes(video.title), 80)
            : <Fragment>
              {!(video.title === undefined)
                ? <span>
                  {stringLimit(replaceQuotes(video.title), 55)}
                  <span><br /><i>{'Haha!'}</i></span>
                </span>
                : stringLimit(replaceQuotes(video.snippet.title), 80)
              }
            </Fragment>}
          </Card.Title>
        </Card.Body>
        {!(video.artist === undefined)
          ? <ListGroup className="list-group-flush video-card-body">
            <ListGroupItem className="video-details video-artist-dims">
              <b>Artist: </b> {stringLimit(replaceQuotes(video.artist), 72)}
            </ListGroupItem>
            <ListGroupItem className="video-details video-album-dims">
              <b>Album: </b> {stringLimit(replaceQuotes(video.album), 70)}
            </ListGroupItem>
          </ListGroup>
          : null
        }
        <Card.Body className={`video-details video-description-dims ${(!(video.snippet === undefined) ? 'video-description-border' : null)}`}>
          <Card.Text>
            <b>Description: </b>
            {!(video.description === undefined)
              ? stringLimit(replaceQuotes(video.description), 170)
              : stringLimit(replaceQuotes(video.snippet.description), 170)
            }
          </Card.Text>
        </Card.Body>
      </Card>
    </Link>
  </Col>
)

export default VideosCard
