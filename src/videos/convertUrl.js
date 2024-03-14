let videoId

const checkUrl = (url) => {
  if (!url.includes('youtube.com') && !url.includes('youtu.be')) {
    return false
  }
}

const getParsed = afterWatch => {
  if (afterWatch[1].substring(0, 11).length === 11) {
    return afterWatch[1].substring(0, 11)
  } else {
    return false
  }
}

const parseUrl = url => {
  let afterWatch
  if (url.includes('youtube.com')) {
    afterWatch = url.split('watch?v=')
  }
  if (url.includes('youtu.be')) {
    afterWatch = url.split('.be/')
  }
  return getParsed(afterWatch)
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
  if (checkUrl(url) === false) {
    return false
  }
  if (url.includes('youtube.com')) {
    if (parseUrl(url) === false) {
      videoId = false
    } else {
      videoId = parseUrl(url)
    }
  } else if (url.includes('youtu.be')) {
    if (parseUrl(url) === false) {
      videoId = false
    } else {
      videoId = parseUrl(url)
    }
  }
  if (videoId === false) {
    return false
  }
  return createEmbedUrl(videoId, settings)
}

export default convertUrl
