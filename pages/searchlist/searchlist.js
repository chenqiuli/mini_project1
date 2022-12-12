// pages/searchlist/searchlist.js
import request from "../../utils/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    searchList: []
  },

  priceSort: false,
  commentSort: false,

  handlePrice() {
    this.priceSort = !this.priceSort;
    this.setData({
      // this.priceSort ? '降序' : '升序'
      searchList: this.priceSort ?
        this.data.searchList.sort((item1, item2) => item2.price - item1.price) : this.data.searchList.sort((item1, item2) => item1.price - item2.price)
    });
  },

  handleComment() {
    this.commentSort = !this.commentSort;
    this.setData({
      // this.commentSort ? '降序' : '升序'
      searchList: this.commentSort ?
        this.data.searchList.sort((item1, item2) => Number(item2.goodcomment.slice(0, -1)) - Number(item1.goodcomment.slice(0, -1))) : this.data.searchList.sort((item1, item2) => Number(item1.goodcomment.slice(0, -1)) - Number(item2.goodcomment.slice(0, -1)))
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // console.log(options.title);
    this.getList(options.id);
    // 动态设置网页标题
    wx.setNavigationBarTitle({
      title: options.title,
    });
  },

  getList(id) {
    request({
      url: `/categories/${id}?_embed=goods`
    }).then(res => {
      // console.log(res);
      this.setData({
        searchList: res.goods
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