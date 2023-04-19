// pages/search/index.js
import {getList} from '../../request/list'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    isFocus: false,
    inpValue: '',
  },
  TimeId: -1,
  goodsList: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getList()
  },
  async getList() {
    const id = 0
    const {data} = await getList(id)
    this.goodsList = data.data
    console.log(data,'searchdata');
  },

  handleInput(e) {
    console.log(e,'eee');
    // console.log(this.data.goodsList, '<-this.data.goodsList->');
    const {
      value
    } = e.detail;
    // console.log(value, '<-value->');
    if (!value.trim()) {
      this.setData({
        goods: [],
        isFocus: false,
      })
      return;
    }
    this.setData({
      isFocus: true,
    })
    clearTimeout(this.TimeId);
    this.TimeId = setTimeout(() => {
      // this.qsearch(value);
      let goodsArr = [];
      if (this.goodsList.length > 0) {
        this.goodsList.map(v => {
          if (v.name) {
            let arr = v.name.indexOf(value) >= 0 ? v : false;
            if (arr) {
              goodsArr.push(arr);
            }
          }
        })
      }
      this.setData({
        goods: goodsArr,
      });
    }, 1000);
  },

  handleCancel() {
    this.setData({
      inpValue: '',
      isFocus: false,
      goods: [],
    });
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