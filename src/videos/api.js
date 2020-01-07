import apiUrl from '../apiConfig'
import axios from 'axios'

export const getVideos = (user) => {
  return axios({
    url: apiUrl + '/videos',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const getVideo = ({ match, user }) => {
  return axios({
    url: `${apiUrl}/videos/${match.params.id}`,
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const deleteVideo = ({ match, user }) => {
  return axios({
    url: `${apiUrl}/videos/${match.params.id}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createVideo = (user, videoData) => {
  return axios({
    url: `${apiUrl}/videos`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      video: {
        artist: videoData.artist,
        title: videoData.title,
        album: videoData.album,
        description: videoData.description,
        url: videoData.url
      }
    }
  })
}

export const updateVideo = (props, videoData) => {
  return axios({
    url: `${apiUrl}/videos/${props.match.params.id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${props.user.token}`
    },
    data: {
      video: {
        artist: videoData.artist,
        title: videoData.title,
        album: videoData.album,
        description: videoData.description,
        url: videoData.url
      }
    }
  })
}

export const createProfilePhotoUpload = (props, imageData) => {
  return axios({
    contentType: false,
    headers: {
      'Authorization': `Token token=${props.user.token}`
    },
    url: `${apiUrl}/profilephotouploads`,
    method: 'POST',
    processData: false,
    data: imageData
  })
}
