Page({
  data: {
    //  地区
    area: 'beijing',
    //  税前工资
    grossPay: 0,
    formData: {

    }
  },
  bindAreaChange: function(e) {
    this.setData({
      area: e.detail
    }, function() {
      console.log('this.data.area', this.data.area);
    });
  },
  bindPayChange: function(e) {
    this.setData({
      grossPay: e.detail
    }, function() {
      console.log('this.data.pay', this.data.grossPay);
    });
  },
  bindFormData: function(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        ...e.detail
      }
    }, function() {
      console.log('this.formData', this.data.formData);
    });
  },
  onShow: function() {

  },
  onLoad: function(options) {
    //  小程序加载完毕
  },
  onHide: function() {

  }
})