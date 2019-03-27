import apiUrl from '../apiConfig'
import axios from 'axios'

export const getSettings = user => {
  return axios({
    url: apiUrl + '/settings',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const createSettings = user => {
  return axios({
    url: `${apiUrl}/settings`,
    method: 'POST',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      setting: {
        autoplay: { checked: false },
        loop: { checked: false }
      }
    }
  })
}

export const updateSettings = (user, settings) => {
  return axios({
    url: `${apiUrl}/settings/${settings._id}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      setting: {
        autoplay: {
          checked: settings.autoplay.checked
        },
        loop: {
          checked: settings.loop.checked
        }
      }
    }
  })
}
