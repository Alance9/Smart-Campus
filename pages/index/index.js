// pages/index/index.js
var adds = {};
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    motto: '珠海市圈宝科技有限公司',
    user: '',
    name: wx.getStorageSync("userInfo"),
    id: wx.getStorageSync("userInfoID"),
    imagesrc: '',
    imgwidth: 0,
    imgheight: 0,  
    flag: true
    // list: [{
    //   "text": "考勤分析"
    // },{
    //   "text": "课堂分析"
    // }]
  },

  // tabChange(e) {
  //   console.log('tab change', e)
  // },

  photoSelect: function() {
    var _this = this;
    wx.showActionSheet({
      itemList: ['拍照', '上传图片'],
      success(res) {
        // 0 是拍照
        if (res.tapIndex == 0) {
          console.log("拍照")
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['camera'],
            success: function(res) {
              console.log(res)
              //res.tempFilePaths[0] 这个是图片
              wx.showToast({
                title: '正在上传',
                icon: 'loading',
                mask: true,
                duration: 1000
              })
              _this.setData({
                imagesrc: res.tempFilePaths[0],
                flag: false
              })
            },
          })
          // 1 是打开相册
        } else if (res.tapIndex == 1) {
          console.log("相册")
          wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album'],
            success: function(res) {
              //res.tempFilePaths[0] 这个是图片
              console.log(res)
              wx.showToast({
                title: '正在上传',
                icon: 'loading',
                mask: true,
                duration: 1000
              })
              _this.setData({
                imagesrc: res.tempFilePaths[0],
                flag: false
              })
            },
          })
        }
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  },

  formSubmit: function(e) {
    var that = this;
    var formData = e.detail.value;
    that.setData({
      name: wx.getStorageSync("name")
    })
    if (that.data.imagesrc == '') {
      wx.showToast({
        title: '请选择图片',
        icon: 'none',
      })
    } else {
      console.log(e.detail.value);
      var token = wx.getStorageSync('token')
      console.log(that.data.imagesrc)
      wx.uploadFile({
        url: 'http://192.168.2.201:3000/api/v1/recognitions/upload_image_for_face_recognition',
        filePath: that.data.imagesrc,
        name: 'image',
        header: {
          // "Content-Type": "multipart/form-data",
          "Authorization": token
        },
        success: function(res) {
          console.log(res);
          wx.showToast({
            title: "上传成功",
            icon: "success",
            duration: 2000,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '../person/person',
            })
          }, 2000);
        },
        fail: function(res) {
          wx.showToast({
            title: "上传失败，请检查网络或稍后重试",
            icon: "none",
            duration: 2000,
            mask: true
          });
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },



  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  },


})