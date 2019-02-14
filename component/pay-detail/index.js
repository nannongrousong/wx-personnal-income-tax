Component({
  properties: {
    payDetail: {
      type: Array,
      value: []
    },
    taxDetail: {
      type: Array,
      value: []
    },
    returnTaxDetail: {
      type: Array,
      value: []
    }
  },
  data: {
    payDetail: [],
    taxDetail: [],
    returnTaxDetail: []
  },
  methods: {
    bindShowDetail: function(e) {
      const {
        detail
      } = e.target.dataset;
      if (detail == '' || detail == '/') {
        return;
      }
      wx.showModal({
        content: detail,
        showCancel: false,
        confirmText: '确定'
      })
    }
  },
  ready: function() {
    const {
      payDetail,
      taxDetail,
      returnTaxDetail
    } = this.properties;
    this.setData({
      payDetail,
      taxDetail,
      returnTaxDetail
    });
  }
})