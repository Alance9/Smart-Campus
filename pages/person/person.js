// pages/person/person.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: wx.getStorageSync("token")
  },

  faceIn(){
    wx.navigateTo({
      url: '../index/index'
    })
  },

  develop(){
    wx.showToast({
      title: '加载中...',
      icon: 'loading',
      duration: 500
    })
  },

  logout(){
    // wx.removeStorageSync(token)
    wx.showToast({
      // title: res.data.info,
      title: '退出成功',
      icon: 'success',
      duration: 2000,
      success: function () {
        wx.clearStorage()
        setTimeout(function () {
          wx.navigateTo({
            url: '../login/login'
          })
        }, 2000);
       
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})