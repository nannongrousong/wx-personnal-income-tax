const {
  socialFundBase
} = require('../../utils/baseData.js');

const areas = socialFundBase.map(({
  value,
  text
}) => ({
  value,
  text
}));

Component({
  properties: {
    area: {
      type: String,
      value: '',
      observer: function(newVal, oldVal, changedPath) {
        this.setData({
          areaArrIndex: areas.findIndex((item) => item.value == newVal)
        });
      }
    },
    grossPay: {
      type: String,
      value: ''
    }
  },
  data: {
    areaArr: areas,
    areaArrIndex: 0,
    focusStyle: ''
  },
  methods: {
    bindAreaChange: function(e) {
      this.triggerEvent('AreaChange', areas[e.detail.value].value);
      this.triggerEvent('PayChange', '');
    },
    bindPayInput: function(e) {
      this.triggerEvent('PayChange', e.detail.value);
    },
    bindPayBlur: function(e) {
      this.setData({
        focusStyle: ''
      });
    },
    bindPayFocus: function(e) {
      this.setData({
        focusStyle: 'y-input-focus'
      });
    },
    bindCompute: function(e) {
      this.triggerEvent('Compute');
    }
  },
  ready: function() {
    const {
      area,
      grossPay
    } = this.properties;
    this.setData({
      area,
      grossPay
    });
  }
});