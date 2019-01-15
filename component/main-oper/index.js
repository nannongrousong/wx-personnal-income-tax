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
      observer: function (newVal, oldVal, changedPath) {
        this.setData({
          areaArrIndex: areas.findIndex((item) => item.value == newVal)
        });
      }
    },
    grossPay: {
      type: Number,
      value: 0
    }
  },
  data: {
    areaArr: areas,
    areaArrIndex: 0
  },
  methods: {
    bindAreaChange: function(e) {
      this.triggerEvent('AreaChange', areas[e.detail.value].value);
    },
    bindPayInput: function(e) {
      this.triggerEvent('PayChange', e.detail.value);
    }
  },
  ready: function() {
    const {
      area, grossPay
    } = this.properties;
    this.setData({
      area,
      grossPay
    });
  }
});