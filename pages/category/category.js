// pages/category/category.js
import request from "../../utils/request";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    vtabs: [],
    activeTab: 0,
  },

  onTabCLick(e) {
    const index = e.detail.index
    console.log('tabClick', index)
  },

  onChange(e) {
    const index = e.detail.index
    console.log('change', index)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    request({
      url: '/categories?_embed=goods',
    }).then(res => {
      this.setData({
        vtabs: res
      });
    });
  },

  handleTap(evt) {
    const item = evt.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/detail/detail?id=${item.id}&title=${item.title}`,
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