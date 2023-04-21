// pages/category/index.js
import {getCateGory} from '../../request/category'
import {getList} from '../../request/list'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cateList: [],
    leftMenuList: [],
    rightContent: [],
    currentIndex: 0,
    scrollTop: 0,
  },
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    const {
      custom
    } = getApp().globalData;

    this.handleItemTap(custom);


    const CatesName = wx.getStorageSync('CatesName');
    const CatesList = wx.getStorageSync('CatesList');
    if (!CatesName) {
      this.getCateGory()
    } else {
      if (Date.now() - CatesName.time > 1000 * 10) {
        this.getCateGory()
      } else {
        this.Cates = CatesList.data;
        let leftMenuList = CatesName.data;
        let rightContent = null;
        if (custom) {
          rightContent = this.Cates.filter(v => v.categoryId == custom.id)
        } else {
          rightContent = this.Cates.filter(v => v.categoryId == leftMenuList[0].id)
        }
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
    
  },

  async getCateGory() {
    const {custom} = getApp().globalData;
    const {data} = await getCateGory()
    let leftMenuList = data.data.map(v => {
      return {
        id: v.id,
        name: v.name
      }
    });
    wx.setStorageSync('CatesName', {
      time: Date.now(),
      data: leftMenuList
    });
    this.setData({
      leftMenuList: data
    })
    const isId = 0
    const res = await getList(isId)
    this.Cates = res.data.data;
    wx.setStorageSync('CatesList', {
      time: Date.now(),
      data: this.Cates
    });
    let rightContent = null;  
    if (custom) {
      rightContent = res.data.data.filter(v => v.categoryId === custom.id)
    } else {
      rightContent = res.data.data.filter(v => v.categoryId === this.data.leftMenuList.data[0].id)
    }
    this.setData({
      rightContent,
    })

  },
  handleItemTap(e) {
    let id = null;
    let index = 0;
    if (e) {
      if (!e.currentTarget) {
        id = e.id;
        index = e.index
      } else {
        id = e.currentTarget.dataset.id;
        index = e.currentTarget.dataset.index;
      }
    }

    let rightContent = this.Cates.filter(v => v.categoryId == id);
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop: 0,
    })
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