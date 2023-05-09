/**
 * 封装项目的请求，使用promise的回调
 * @param {*} params 
 */

//  端口根据json-server开启时设置的端口变更
const urlPrefix = "http://localhost:9000";

function request(params, isHeader = false) {
    // 在请求前显示loading
    wx.showLoading({
      title: '正在加载中',
    });
    return new Promise((resolve, reject) => {
        wx.request({
          ...params,
          url: urlPrefix + params.url,
          success: (res) => {
            if(isHeader) {
              resolve({
                list: res.data,
                total: res.header["X-Total-Count"]
              });
            }
              resolve(res.data);
          },
          fail: (err) => {
              reject(err);
          },
          complete: () => {
            // 请求无论成功与否隐藏loading
            wx.hideLoading({
              success: (res) => {},
            });
          }
        });
    });
}

export default request;