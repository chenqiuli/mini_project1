// logs.js
const util = require('../../utils/util.js')
import request from "../../utils/request";

Page({
  data: {
    logs: []
  },
  onLoad() {
    this.setData({
      logs: (wx.getStorageSync('logs') || []).map(log => {
        return {
          date: util.formatTime(new Date(log)),
          timeStamp: log
        }
      })
    })
  },

  handleGet(){
       request({
         url: '/user',
       }).then(res => {
           console.log(res);
       });
   },

   handlePost() {
       request({
           url: '/user',
           method: 'POST',
           data: {
               username: "王五",
               password: "123",
           },
       }).then(res => {
           console.log(res)
       })
   },

   handlePut(){    
       request({
         url: '/user/3',
         method: 'PUT',
         data: {
             username: "老秋",
             password: "123456"
         }
       }).then(res => {
           console.log(res)
       })
   },

   handleDelete(){
       request({
         url: '/user/3',
         method: 'DELETE',
       }).then(res => {
           console.log(res)
       })
   }
})
