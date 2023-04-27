import Axios from 'wx-mini-program-axios'
const service = Axios.create({
  baseURL: 'http://127.0.0.1:3100'
})

service.interceptors.request.use(function(config) {
  wx.showLoading({
    title: '加载中',
  })
  const token = wx.getStorageSync('token')
  token ? config.headers.Authorization = token : ''
  return config
},function(error) {
  return Promise.reject(error)
})

service.interceptors.response.use(function(response) {
  wx.hideLoading()
  if(response.data.code === -1) {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    wx.showModal({
      title: '登录超时',
      content: '请重新登录授权',
      cancelText: '暂不登录',
      confirmText: '确认登录',
      success(res) {
        if (res.confirm) {
          wx.switchTab({
            url: "/pages/user/index"
          })
        } else {
          wx.navigateBack()
        }
      }
    })
  }
  response.headers.Authorization ? wx.setStorageSync('token',response.headers.Authorization ) : ''
  return response
},function(error) {
  return Promise.reject(error)
})

module.exports = service