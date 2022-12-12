import request from "../../utils/request";
import checkAuth from "../../utils/auth";

// pages/detail/detail.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    tabList: ['商品详情', '用户评价'],
    current: 0,
    commentList: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // options是接收跳转的参数
    // console.log(options);
    // 动态设置当前页面的标题
    wx.setNavigationBarTitle({
      title: options.title,
    });
    this.getDetail(options.id);
    // 用户评价所有页面都用的一个接口
    this.getComment();
  },

  getDetail(id) {
    request({
      url: `/goods/${id}`
    }).then(res => {
      // console.log(res)
      this.setData({
        info: res
      });
    })
  },

  getComment() {
    request({
      url: '/comments'
    }).then(res => {
      // console.log(res);
      this.setData({
        commentList: res
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

  },

  handleTap(e) {
    wx.previewImage({
      urls: this.data.info.slides.map(item => `http://localhost:3000${item}`),
      current: e.target.dataset.current,
    });
  },

  handleActive(e) {
    this.setData({
      current: e.target.dataset.index
    });
  },

  handleAdd() {
    const nickName = wx.getStorageSync('token').nickName;
    const tel = wx.getStorageSync('tel');
    const goodId = this.data.info.id;
    checkAuth(() => {
      // 加入购物车，要判断该用户昵称，手机号码和该商品id有没有存在购物车中，如果有，就把这个商品id加1；如果没有，就要新增一条商品记录进去
      request({
        url: `/carts?username=${nickName}&tel=${tel}&goodId=${goodId}`
      }).then(res => {
        // console.log(res[0]);
        // 返回的结果是空，就要新增进去，默认1条，没有选中
        if(res.length === 0){
          return request({
            url: '/carts',
            method: 'POST',
            data: {
              username: nickName,
              tel,
              goodId,
              number: 1,
              checked: false
            }
          })
        }else{
          // 如果有记录查回来，说明该商品存在于购物车了，此时让这条商品数量再加1
          return request({
            url: `/carts/${goodId}`,
            method: 'PUT',
            data: {
              ...res[0],
              number: res[0].number + 1
            }
          })
        }
      }).then(res => {
        wx.showToast({
          title: '添加成功，在购物车等亲 ~',
          icon: 'none'
        });
      })
    });
  },

  handleChange() {
    checkAuth(() => {
      wx.switchTab({
        url: '/pages/cart/cart',
      });
    });
  }
})