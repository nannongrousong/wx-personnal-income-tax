Component({
  properties: {
    payDetail: {
      type: Array,
      value: []
    },
    taxDetail: {
      type: Array,
      value: []
    }
  },
  data: {
    payDetail: [],
    taxDetail: []
  },
  methods: {

  },
  ready: function() {
    const {
      payDetail,
      taxDetail
    } = this.properties;
    this.setData({
      payDetail,
      taxDetail
    });
  }
})