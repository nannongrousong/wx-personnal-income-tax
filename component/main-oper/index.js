const {
  socialFundBase
} = require('../../utils/util.js');

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
      value: ''
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
    onLoad: function() {
      console.log('onload')
    },
    bindAreaChange: function(e) {
      this.setData({
        areaArrIndex: e.detail.value
      });
      this.triggerEvent('AreaChange', e.detail.value);
    },
    bindPayInput: function(e) {
      this.triggerEvent('GrossPayChange', e.detail.value);
    }
  },
  ready: function() {

  }
});