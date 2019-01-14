Page({
  data: {
    //  地区
    area: 'beijing',
    //  税前工资
    grossPay: 0
  },
  bindAreaChange: function(e) {
    this.setData({
      area: e.detail
    });
  },
  bindGrossPayChange: function (e) {
    this.setData({
      grossPay: e.detail
    });
  },
  onShow: function () {
    
  },
  onLoad: function (options) {
    //  小程序加载完毕
  },
  onHide: function () {

  }
})