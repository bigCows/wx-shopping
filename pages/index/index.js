// index.js
import { getList } from '../../request/list'
// import list from ''
// import list from '../../images/swiper/swiper2.png'
// import list from '../../images/swiper/swiper3.png'
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    swipers:['../../images/swiper/swiper1.png','../../images/swiper/swiper2.png','../../images/swiper/swiper3.png'],
    imgs:['../../images/category/clothing2.png','../../images/category/pants.png', '../../images/category/skirt.png','../../images/category/clothing1.png','../../images/category/clothing3.png','../../images/category/seckill.png','../../images/category/socks.png','../../images/category/shoes.png',],
    imgName:['上装','裤装','裙装','套装','外套','秒杀','袜子','鞋',],
    goodsList: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    this.getList()
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  async getList() {
    let id = 0
    const {data} = await getList(id)
    console.log(data);
    this.goodsList = data
    this.setData({
      goodsList: data
    })
    console.log(this.goodsList,'xxx');
  },
})
