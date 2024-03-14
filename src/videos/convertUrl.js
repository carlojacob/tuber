const checkUrl = (url) => {
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) return false
  return true
}

const getParsedUrlID = afterWatch => {
  if (afterWatch[1] && afterWatch[1].substring(0, 11).length === 11) {
    return afterWatch[1].substring(0, 11)
  } else {
    return false
  }
}

const parseUrlForID = url => {
  let afterWatch
  if (url.includes('youtube.com')) afterWatch = url.split('watch?v=')
  if (url.includes('youtu.be')) afterWatch = url.split('.be/')
  return getParsedUrlID(afterWatch)
}

export const createEmbedUrl = (videoId, settings) => {
  let auto = 0
  let loop = 0
  if (settings) {
    if (settings.autoplay.checked) {
      auto = 1
    }
    if (settings.loop.checked) {
      loop = 1
    }
  }
  if (settings) {
    let playlistId
    if (loop === 1) {
      playlistId = videoId
      return `https://www.youtube.com/embed/${videoId}?autoplay=${auto}&loop=${loop}&playlist=${playlistId}`
    } else {
      playlistId = ''
      return `https://www.youtube.com/embed/${videoId}?autoplay=${auto}&loop=${loop}`
    }
  } else {
    return `https://www.youtube.com/embed/${videoId}`
  }
}

const convertUrl = (url, settings) => {
  // Return false if URL does not include youtube.com or youtu.be
  if (!checkUrl(url)) return false
  // Parse URL for video ID. Function returns false if the url doesn't contain a valid ID
  const videoId = parseUrlForID(url)
  // Return false if video ID is invalid
  if (!videoId) return false
  // Return embedment URL if video ID is valid
  return createEmbedUrl(videoId, settings)
}

export default convertUrl
