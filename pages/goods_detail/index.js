// pages/goods_detail/index.js
import { getList } from '../../request/list'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsDetail: []
  },

    /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    let pages = getCurrentPages();
    console.log(pages,'pagesxxx');
    let currentPage = pages[pages.length - 1];
    let options = currentPage.options;
    const {
      id
    } = options;
    console.log(id,'idxxxx');
    this.getGoodsDetail(id);
  },

  async getGoodsDetail(id) {
    const {data} = await getList(id)
    console.log(data,'dataid');
    this.goodsDetail = data
    this.setData({
      goodsDetail: data
    })
    console.log(this.goodsDetail,'goodsDetail');
  },

  handleCartAdd() {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.basicInfo.id === this.goodsDetail.data[0].basicInfo.id);
    if (index === -1) {
      // 不存在 第一次添加
      this.goodsDetail.data[0].num = 1;
      this.goodsDetail.data[0].checked = true;
      cart.push(this.goodsDetail.data[0])
    } else {
      // 已存在购物车数据， 当前商品的数量
      cart[index].num++;
    }
    wx.setStorageSync('cart', cart);
    wx.showToast({
      title: '加入成功',
      icon: 'success',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

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