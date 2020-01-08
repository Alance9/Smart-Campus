//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '珠海圈宝网络技术有限公司技术提供',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    username: '',
    password: '', 
  },

  login: function(e) {
    var that = this;
    var formData = e.detail.value;
    // formData.password == '' ||
    // || formData.password.length == 0
    if (formData.username == '' || formData.username.length == 0) {
      wx.showToast({
        title: '账号不能为空',
        icon: 'none',
      })
    } else if (formData.username !== '' || formData.username.length !== 0){
      wx.request({
        url: 'http://192.168.2.201:3000/api/v1/users/login',
        data: formData,
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: 'post',
        success(res) {
          console.log(res)
          wx.setStorageSync('username', formData.username); 
          wx.setStorageSync('password', formData.password); 
          wx.setStorageSync('token', res.data.token); 
          if (res.data.status == 1) {
            console.log(res.data.status)
            wx.showToast({
              // title: res.data.info,
              title: '登录成功',
              icon: 'success',
              duration: 2000,
              success: function() {
                setTimeout(function () {
                  wx.switchTab({
                    url: '../person/person'
                  })
                }, 2000);
              }
            })
          } else {
            wx.showToast({
              title: '登录失败',
              icon: 'none',
              duration: 2000,
            })
            console.log("登录失败")
          }
        }
      })
    } else {
      wx.showToast({
        title: '账户或密码错误',
        icon: 'none',
        duration: 2000,
      })
      console.log("登录失败")
    }
  },

  onLoad: function (options) {
    //获取本地数据
    var username = wx.getStorageSync('username');
    var password = wx.getStorageSync('password');
    // var token = wx.getStorageSync('token');

    console.log(username);
    console.log(password);
    // console.log(token);
    if (username) {
      this.setData({ username: username });
    }
    if (password) {
      this.setData({ password: password });
    }

  }, 
})

