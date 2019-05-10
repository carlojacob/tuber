import youtubeApiKey from './youtubeApiConfig'
import axios from 'axios'

const getYoutubeVideoData = youtubeSearchTerm => {
  const maxResults = '24'
  const order = 'relevance'
  const type = 'video'
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${maxResults}&order=${order}&q=${youtubeSearchTerm}&type=${type}&key=${youtubeApiKey}`
  return axios({
    url: youtubeUrl,
    method: 'GET'
  })
}

export default getYoutubeVideoData
