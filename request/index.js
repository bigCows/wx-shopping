import Axios from 'wx-mini-program-axios'
const service = Axios.create({
  baseURL: 'http://127.0.0.1:3100'
})

service.interceptors.request.use(function(config) {
  return config
},function(error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
  return response
},function(error) {
  return Promise.reject(error)
})

module.exports = service