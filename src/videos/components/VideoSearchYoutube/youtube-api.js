import axios from 'axios'

const getYoutubeVideoData = youtubeSearchTerm => {
  const youtubeUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=24&q=${youtubeSearchTerm}&type=videos&key=AIzaSyCA0sfilga-T96Xeg0ZRKPCL4DYSTC7AZ8`
  return axios({
    url: youtubeUrl,
    method: 'GET'
  })
}

export default getYoutubeVideoData
