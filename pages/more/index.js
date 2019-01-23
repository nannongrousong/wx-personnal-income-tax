const {
  showMoney
} = require('../../utils/index.js');
const {
  taxRatioMap
} = require('../../utils/baseData.js');

Page({
  data: {
    taxRatio: []
  },
  onLoad: function() {
    const taxRatio = taxRatioMap.map(({
      level,
      shouldTax,
      preOffRatio,
      baseOff
    }) => {
      return {
        level,
        shouldTax: level == 1 ? `A≤${shouldTax[1]}元` : (level == 7 ? `A＞${shouldTax[0]}元` : `${shouldTax[0]}元＜A≤${shouldTax[1]}元`),
        preOffRatio: `${preOffRatio}%`,
        baseOff
      };
    });

    this.setData({
      taxRatio
    });
  },
  bindCopyUrl: function(e) {
    const {
      url
    } = e.target.dataset;
    wx.setClipboardData({
      data: url,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '地址复制成功'
            })
          }
        })
      }
    })
  }
})