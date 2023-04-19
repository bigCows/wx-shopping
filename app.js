// app.js
// import {REQUEST} from 'miniprogram-request';
// REQUEST.Defaults.baseURL = "http://127.0.0.1:3000";
// const request = require('./request/index')
// const req = require('./request/index')
const service = require('wx-mini-program-axios')


App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null
  },
  service:service
  // request
  // myReq:REQUEST 
})
