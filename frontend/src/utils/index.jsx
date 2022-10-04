import { axiosInstance } from './axios'

export const getResError = (err) => {
  for (let i = 0; i < Object.entries(err).length; i++) {
    for (let j = 1; j < Object.entries(err)[i].length; j++) {
      return Object.entries(err)[i][j]
    }
  }
}

export { axiosInstance }
