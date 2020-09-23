import axios from 'axios'
import { message } from 'antd'
// import qs from 'qs'
const CONFIG = {
  baseURL: process.env.axiosBaseURL,
  // baseURL: 'https://yapi.dae.org/mock/446',
  // transformRequest: [
  //   data => {
  //     return qs.stringify(data)
  //   },
  // ],
}

export default function request(config) {
  const instance = axios.create()

  instance.interceptors.request.use(cfg => {
    const token = localStorage.getItem('token')
    if (token) {
      cfg.headers.Authorization = `Bearer ${token}`
    }
    return cfg
  })

  instance.interceptors.response.use(res => {
    const { code, data, message: msg } = res.data
    if (config.fullRes) {
      return res
    }
    if (code === 401) {
      localStorage.removeItem('token')
      window.location.href = '/'
      return null
    }
    if (code !== 0) {
      message.error(msg)

      return null
    }
    return data
  })

  return instance.request({ ...CONFIG, ...config })
}

export const get = (url, config) => {
  return request({
    url,
    method: 'GET',
    ...config,
  })
}

export const post = (url, data, config) => {
  return request({
    url,
    data,
    method: 'POST',
    ...config,
  })
}
