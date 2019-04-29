import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'

const VideoForm = ({ handleSubmit, handleChange, video, videoId }) => (
  <Form
    className="auth-form"
    onSubmit={handleSubmit}>
    <h3 className="tuber-form-heading">
      {videoId ? 'Edit Video' : 'Add Video'}
    </h3>
    <Form.Group controlId="title">
      <Form.Label className="tuber-form-label">Title</Form.Label>
      <Form.Control
        name="title"
        value={video.title}
        placeholder="Video Title"
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="artist">
      <Form.Label className="tuber-form-label">Artist</Form.Label>
      <Form.Control
        name="artist"
        value={video.artist}
        placeholder="Artist Name"
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="album">
      <Form.Label className="tuber-form-label">Album</Form.Label>
      <Form.Control
        name="album"
        value={video.album}
        placeholder="Album Name"
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group controlId="description">
      <Form.Label className="tuber-form-label">Description</Form.Label>
      <Form.Control
        name="description"
        value={video.description}
        placeholder="Description"
        onChange={handleChange}
        as="textarea"
        rows="3"
      />
    </Form.Group>

    <Form.Group controlId="url">
      <Form.Label className="tuber-form-label">URL</Form.Label>
      <Form.Control
        required
        name="url"
        value={video.url}
        placeholder="YouTube URL only (required)"
        onChange={handleChange}
      />
    </Form.Group>

    <Form.Group className="btn-flex-end">
      <Link to={videoId ? `/videos/${videoId}` : '/video-add'}>
        <Button
          variant="primary-outline"
          className="btn-mr">
          Cancel
        </Button>
      </Link>
      <Button
        variant="primary"
        type="submit"
        className="btn-ml">
        {videoId ? 'Edit Video' : 'Add Video'}
      </Button>
    </Form.Group>
  </Form>
)

export default VideoForm
