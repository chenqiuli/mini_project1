// pages/home/home.js
import request from "../../utils/request";

Page({
  /**
   * 页面的初始数据，放在data内的数据是可以去更新视图的
   */
  data: {
    swiperList: [],
    goodsList: [],
  },

  // 记录变量
  pageNum: 1,
  goodsTotal: 0,

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.renderSwiper();
    this.renderGoods(1);
  },

  renderSwiper() {
    request({
      url: '/recommends',
    }).then(res => {
      // console.log(res);
      this.setData({
        swiperList: res,
      });
    })
  },

  renderGoods(pageNum) {
    this.pageNum = pageNum;
    request({
      url: `/goods?_page=${pageNum}&_limit=5`
    }, true).then(res => {
      // console.log(res);
      this.setData({
        goodsList: [...this.data.goodsList, ...res.list],
      });
      this.goodsTotal = Number(res.total);
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
   * 微信开发者工具模拟器在下拉刷新2秒后会自动回去，但是真机不会，需在异步完成后主动停止下拉
   */
  onPullDownRefresh() {
    // console.log("下拉刷新了");
    setTimeout(() => {
      // console.log(1);
      // 在异步完成后主动停止下拉
      wx.stopPullDownRefresh();
    },1000);
  },

  /**
   * 页面上拉触底事件的处理函数
   * 到底函数会无限触发，所以需要去判断控制后面的代码不去执行
   */
  onReachBottom() {
    // console.log("到底了");
    if(this.data.goodsList.length === this.goodsTotal){
      return;
    }
    this.renderGoods(this.pageNum + 1);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  handleEvent() {
    console.log("搜索处理");
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  handleDetail(e) {
    const id = e.currentTarget.dataset.id;
    const title = e.currentTarget.dataset.title;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${id}&title=${title}`,
    });
  }

})