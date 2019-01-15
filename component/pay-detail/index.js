const {

} = require('../../utils/baseData.js');

Component({
  properties: {
    formData: {
      type: Object,
      value: {}
    },
    payDetail: {
      type: Array,
      value: []
    }
  },
  data: {
    payDetail: []
  },
  methods: {
    bindSelectChange: function(e) {

    }
  },
  ready: function() {
    const {
      payDetail
    } = this.properties;
    this.setData({
      payDetail
    });
  }
})