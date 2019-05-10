let youtubeApiKey
const youtubeApiKeys = {
  production: 'AIzaSyCA0sfilga-T96Xeg0ZRKPCL4DYSTC7AZ8',
  development: 'AIzaSyD3VK1XS0ltkl69R2k2h0GqMOjJpVZl8jA'
}

if (window.location.hostname === 'localhost') {
  youtubeApiKey = youtubeApiKeys.development
} else {
  youtubeApiKey = youtubeApiKeys.production
}

export default youtubeApiKey
