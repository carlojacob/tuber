import apiUrl from '../apiConfig'
import axios from 'axios'

export const getSettings = (user) => {
  return axios({
    url: apiUrl + '/settings',
    method: 'GET',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}
