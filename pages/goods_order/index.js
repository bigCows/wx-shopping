// pages/goods_order/index.js
import {getGoodsOrder} from '../../request/goods-order'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    iptValue: '',
    timerId: 0,
    goodsOrderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const value = 1
    this.getGoodsOrder(value)
  },
  async getGoodsOrder(value) {
    const data  = await getGoodsOrder(value)
        if(data.status === 200) {
         this.goodsOrderList = data.data.data
         this.setData({
           goodsOrderList:data.data.data
         })
        }
        console.log(data,'goodsorder');
  },
  onInput(e) {
    const { value } = e.detail
    clearTimeout(this.timerId)
    this.timerId = setTimeout(async() => {
      if(value.trim().length !== 0) {
        // this.goodsOrderList(value)
        const data  = await getGoodsOrder(value)
        if(data.status === 200) {
         this.goodsOrderList = data.data.data
         this.setData({
           goodsOrderList:data.data.data
         })
        }
        console.log(data,'goodsorder');
      }
    }, 1000);
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
    const token = wx.getStorageSync('token')
    if(!token) {
      wx.showModal({
        title: '提示',
        content: '本次操作需要您的登录授权',
        cancelText: '暂不登录',
        confirmText: '确认登录',
        success(res) {
          console.log(res,
            'resss');
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