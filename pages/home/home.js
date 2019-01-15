Page({
  data: {
    //  地区
    area: 'beijing',
    //  税前工资
    grossPay: 0,
    formData: {

    },
    payDetail: [{
      id: 0,
      type: '养老保险金',
      person: '100',
      company: '2000'
    }, {
      id: 1,
      type: '医疗保险金',
      person: '200',
      company: '3000'
    }, {
      id: 2,
      type: '失业保险金',
      person: '200',
      company: '3000'
    }, {
      id: 3,
      type: '住房公积金',
      person: '200',
      company: '3000'
    }, {
      id: 4,
      type: '补充公积金',
      person: '200',
      company: '3000'
    }, {
      id: 5,
      type: '工伤保险金',
      person: '200',
      company: '3000'
    }, {
      id: 6,
      type: '生育保险金',
      person: '200',
      company: '3000'
    }, {
      id: 7,
      type: '共计支出',
      person: '200',
      company: '3000'
    }]
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
  bindCompute: function(e) {
    console.log('start compute')
  },
  onShow: function() {

  },
  onLoad: function(options) {
    //  小程序加载完毕
  },
  onHide: function() {

  }
})