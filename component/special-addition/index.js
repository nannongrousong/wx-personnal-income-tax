const childEduArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}];
const continueEduArr = [{
  value: 1,
  text: '400（月扣）'
}, {
  value: 2,
  text: '3600（年扣）',
}];
const loanArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}];
const rentArr = [{
  value: 0,
  text: 0
}, {
  value: 800,
  text: 800
}, {
  value: 1100,
  text: 1100
}, {
  value: 1500,
  text: 1500
}];
const supportArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}, {
  value: 2000,
  text: 2000
}];

Component({
  properties: {
    formData: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
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
    bindSelectChange: function(e) {
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
  ready: function() {

  }
})