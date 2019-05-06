import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const VideoAdd = () => (
  <div className="video-add-header">
    <div className="video-add-header-inline">
      <h3 className="tuber-form-heading">
        Add Video
      </h3>
      <Link to='/videos'>
        <Button
          variant="primary-outline"
          className="btn-mr">
          Cancel
        </Button>
      </Link>
      <Link to='/video-search-youtube'>
        <Button
          variant="primary"
          className="btn-mb">
          Search YouTube
        </Button>
      </Link>
      <Link to='/video-create'>
        <Button
          variant="primary"
          className="btn-mb">
          Add Manually
        </Button>
      </Link>
    </div>
  </div>
)

export default VideoAdd
