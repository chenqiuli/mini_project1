// pages/addaddress/addaddress.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "add",
    form: {
      consignee: "",
      phone: "",
      region: "",
      address: "",
      isDefault: true,
    }
  },

  formInputChange(event) {
    const key = event.currentTarget.dataset.field;
    const value = event.detail.value;
    this.setData({
      [`form.${key}`]: value
    });
  },

  switchChange(event) {
    this.setData({
      ['form.isDefault']: event.detail.value
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      type: options.type
    });
    const type = options.type === "add" ? "添加" : "编辑";
    wx.setNavigationBarTitle({
      title: `${type}收货地址`,
    });
    if (type === "编辑") {
      request({
        url: `/address/${options.id}`
      }).then(res => {
        this.setData({
          form: {
            ...res
          }
        });
      });
    }
  },

  handleTap() {
    wx.choosePoi({
      success(res) {
        console.log(res)
      },
      fail(res) {
        console.log(res)
      },
      complete(res) {
        console.log(res)
      }
    });
  },

  handleSubmitForm() {
    request({
      url: '/address',
      method: 'POST',
      data: {
        ...this.data.form,
      }
    }).then(res1 => {
      console.log(res1);
      wx.showToast({
        title: '添加收货地址成功',
      });
      wx.navigateTo({
        url: '/pages/address/address',
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