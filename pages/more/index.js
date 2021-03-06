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
    wx.showShareMenu({

    });
    
    const taxRatio = taxRatioMap.map(({
      level,
      shouldTax,
      preOffRatio,
      baseOff
    }) => {
      return {
        level,
        shouldTax: level == 1 ? `A≤${shouldTax[1]}` : (level == 7 ? `A＞${shouldTax[0]}` : `${shouldTax[0]}＜A≤${shouldTax[1]}`),
        preOffRatio: `${preOffRatio}%`,
        baseOff
      };
    });

    this.setData({
      taxRatio
    });
  },
  onShareAppMessage: function (options) {

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