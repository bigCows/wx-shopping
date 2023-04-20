import {login} from '../../request/login'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    wxlogin: true,
  },

  login() {
    this.setData({
      wxlogin: false
    })
 
  },
  processLogin(e) {
    wx.getUserProfile({
      desc: "获取用户信息",
      success: (res) => {
        console.log(res,'resinof');
        const {
          userInfo
        } = res;
        this.userInfo = userInfo
        this.setData({
          userInfo
        })
        wx.setStorageSync("userInfo", userInfo);
        var that = this
        wx.login({
          async success (res) {
             if (res.code) {
               console.log(that.userInfo,'xxxxxx');
             const data = await login(res.code,that.userInfo.nickName)
             } else {
               console.log('登录失败！' + res.errMsg)
             }
           }
         })
      },
      fail: () => {
        wx.showToast({
          title: '获取用户信息失败',
          icon: 'none',
        })
      }
    })
    this.setData({
      wxlogin: true,
    })
   },

   cancelLogin() {
    this.setData({
      wxlogin: true
    })
  },

  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const userInfo = wx.getStorageSync("userInfo");
    if (!userInfo) {
      this.setData({
        wxlogin: false,
        userInfo: {},
      })
    } else {
      this.setData({
        userInfo
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})