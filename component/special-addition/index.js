const {
  childEduArr,
  continueEduArr,
  loanArr,
  rentArr,
  supportArr
} = require('../../utils/baseData.js');

Component({
  properties: {
    formData: {
      type: Object,
      value: {},
      observer: function (newVal, oldVal, changedPath) {
        const {
          formData
        } = this.properties;
        const {
          childEduArrIndex = 0,
          continueEduArrIndex = 0,
          loanArrIndex = 0,
          rentArrIndex = 0,
          supportArrIndex = 0,
          bigSick = 0
        } = formData;
        this.setData({
          formData,
          childEduArrIndex,
          continueEduArrIndex,
          loanArrIndex,
          rentArrIndex,
          supportArrIndex,
          bigSick
        });
      }
    }
  },
  data: {
    childEduArr,
    childEduArrIndex: 0,
    continueEduArr,
    continueEduArrIndex: 0,
    loanArr,
    loanArrIndex: 0,
    rentArr,
    rentArrIndex: 0,
    supportArr,
    supportArrIndex: 0,
    bigSick: 0
  },
  methods: {
    bindSelectChange: function (e) {
      const {
        type
      } = e.target.dataset;
      if (type == 'bigSick') {

        this.triggerEvent('FormData', {
          [type]: e.detail.value <= 80000 ? e.detail.value : 80000
        });
      } else {
        this.triggerEvent('FormData', {
          [`${type}ArrIndex`]: e.detail.value
        });
      }
    }
  },
  ready: function () {

  }
})