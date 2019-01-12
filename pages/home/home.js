const app = getApp()

Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  bindNavLottery: function () {
    wx.navigateTo({
      url: '../lottery/lottery',
    })
  },
  bindNavMap: function () {
    wx.navigateTo({
      url: '../map/map',
    })
  },
  onShow: function () {
    if (app.globalData.userInfo) {
    }
  },
  onLoad: function (options) {
    //  小程序加载完毕
  },
  onHide: function() {
    
  }
})