// pages/auth/auth.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  handleTap() {
    wx.getUserProfile({
      desc: '用于获取微信信息',
      success: (res) => {
        // console.log(res);
        wx.setStorageSync('token', res.userInfo);
        wx.navigateTo({
          url: '/pages/telform/telform',
        });
      },
      fail: (err) => {
        wx.navigateBack({
          delta: 1
        });
      }
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