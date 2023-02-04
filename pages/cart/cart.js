import request from "../../utils/request";
import checkAuth from '../../utils/auth';

// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    slideButtons: [{
      text: '删除',
      type: 'warn'
    }],

    cartList: [],
  },

  getCartList() {
    checkAuth(() => {
      request({
        url: `/carts?_expand=good&username=${wx.getStorageSync('token').nickName}&tel=${wx.getStorageSync('tel')}`
      }).then(res => {
        console.log(res)
        this.setData({
          cartList: res
        });
        wx.setNavigationBarTitle({
          title: `购物车 (${res.length})`,
        });
      });
    });
  },

  slideButtonTap(evt) {
    const id = evt.currentTarget.dataset.id;
    request({
      url: `/carts/${id}`,
      method: 'delete',
    }).then(() => {
      this.getCartList();
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  handleCheck(evt) {
    const item = evt.currentTarget.dataset.item;
    // 调用接口改变checked的值，然后重新刷新页面
    request({
      url: `/carts/${item.id}`,
      method: 'PUT',
      data: {
        username: item.username,
        tel: item.tel,
        goodId: item.goodId,
        number: item.number,
        checked: !item.checked
      }
    }).then(() => {
      this.getCartList();
    })
  },

  handleMinus(evt) {
    const item = evt.currentTarget.dataset.item;
    if (item.number === 1) {
      wx.showToast({
        title: '宝贝数量不能再少了o(╥﹏╥)o',
        icon: 'none'
      });
      return;
    }
    // 调用接口改变num的值，然后重新刷新页面
    request({
      url: `/carts/${item.id}`,
      method: 'PUT',
      data: {
        username: item.username,
        tel: item.tel,
        goodId: item.goodId,
        number: item.number - 1,
        checked: item.checked
      }
    }).then(() => {
      this.getCartList();
    })
  },

  handleAdd(evt) {
    const item = evt.currentTarget.dataset.item;
    // 调用接口改变num的值，然后重新刷新页面
    request({
      url: `/carts/${item.id}`,
      method: 'PUT',
      data: {
        username: item.username,
        tel: item.tel,
        goodId: item.goodId,
        number: item.number + 1,
        checked: item.checked
      }
    }).then(() => {
      this.getCartList();
    })
  },

  handleInput(evt) {
    const item = evt.currentTarget.dataset.item;
    const num = Number(evt.detail.value);
    // 调用接口改变num的值，然后重新刷新页面
    request({
      url: `/carts/${item.id}`,
      method: 'PUT',
      data: {
        username: item.username,
        tel: item.tel,
        goodId: item.goodId,
        number: num,
        checked: item.checked
      }
    }).then(() => {
      this.getCartList();
    });
  },

  handleAllCheck(evt) {
    if (!evt.detail.value.length) {
      // 未选中
      const newCartList = this.data.cartList.map(item => {
        return {
          ...item,
          checked: false
        }
      });
      this.setData({
        cartList: newCartList
      });
    } else {
      // 选中
      const newCartList = this.data.cartList.map(item => {
        return {
          ...item,
          checked: true
        }
      });
      this.setData({
        cartList: newCartList
      });
    }
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
    this.getCartList();
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