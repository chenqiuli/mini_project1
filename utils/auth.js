/**
 * 1.已授权并绑定手机号的用户，直接跳转购物车页，把行为留给用户，预留一个回调
 * 2.已授权未绑定手机号的用户，引导跳转手机号绑定
 * 3.未授权未绑定手机号的用户，先跳转授权页授权后跳转手机号绑定
 * 
 * 已授权表示在本地存储存有token的信息  wx.getStorageSync('token')
 * 已绑定手机号表示在本地存储有tel的信息  wx.getStorageSync('tel')
 * 
 * 授权只需要授权一次
 */

function checkAuth(callback) {
  if(wx.getStorageSync('token')){
    if(wx.getStorageSync('tel')){
      callback();
    }else{
      wx.navigateTo({
        url: '/pages/telform/telform',
      });
    }
  }else{
    wx.navigateTo({
      url: '/pages/auth/auth',
    });
  }
}

export default checkAuth;