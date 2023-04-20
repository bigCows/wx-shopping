import Axios from 'wx-mini-program-axios'
const service = Axios.create({
  baseURL: 'http://127.0.0.1:3100'
})

service.interceptors.request.use(function(config) {
  const token = wx.getStorageSync('token')
  token ? config.headers.Authorization = token : ''
  return config
},function(error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
  response.headers.Authorization ? wx.setStorageSync('token',response.headers.Authorization ) : ''
  return response
},function(error) {
  return Promise.reject(error)
})

module.exports = service