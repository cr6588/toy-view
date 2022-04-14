import axios from 'axios'
import { ElMessage } from 'element-plus'

axios.defaults.timeout = 10000

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.error(error)
})
axios.interceptors.response.use(function (response) {
  switch (response.data.status) {
    case 0:
      return response.data
    default:
      ElMessage.error(response.data.msg)
      return Promise.reject(response.data)
  }
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error)
})

export default axios
