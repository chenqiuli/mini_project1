// pages/mine/mine.js
import checkAuth from "../../utils/auth";
import request from "../../utils/request";

const token = wx.getStorageSync('token');
const tel = wx.getStorageSync('tel');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    nickName: "",
    avatarUrl: ""
  },

  handleChange() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      camera: 'back',
      success: (res) => {
        const newAvatarUrl = res.tempFiles[0].tempFilePath
        this.setData({
          avatarUrl: newAvatarUrl
        });
        // 存储至Storage
        wx.setStorageSync('token', {
          ...wx.getStorageSync('token'),
          avatarUrl: newAvatarUrl
        });
        // 存至后端，先取到这条数据的id，再去修改
        request({
          url: `/users?nickName=${token.nickName}&tel=${tel}`,
        }).then(res => {
          const id = res[0].id;
          return id;
        }).then(res => {
          request({
            url: `/users/${res}`,
            method: 'PUT',
            data: {
              ...wx.getStorageSync('token'),
              avatarUrl: newAvatarUrl,
              tel
            }
          });
        })
      }
    });
  },

  handleAddAddress(){
    wx.navigateTo({
      url: '/pages/address/address',
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    checkAuth(() => {
      this.setData({
        nickName: token.nickName,
        avatarUrl: token.avatarUrl
      });
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
    checkAuth(() => {
      this.setData({
        nickName: token.nickName,
        avatarUrl: token.avatarUrl
      });
    });
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