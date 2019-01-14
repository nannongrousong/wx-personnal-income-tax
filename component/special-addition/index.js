Component({
  properties: {
    label: {
      type: String,
      value: ''
    },
    source: {
      type: Array,
      value: []
    },
    removeBarrage: {
      type: Function,
    }
  },
  data: {
    childEduArr: [{
      value: 0,
      text: 0
    }, {
      value: 1000,
      text: 1000
    }],
    childEduArrIndex: 0,
    continueEduArr: [{
        value: 1,
        text: '400（月扣）'
      },
      {
        value: 2,
        text: '3600（年扣）',
      }
    ],
    continueEduArrIndex: 0,
    loanArr: [{
      value: 0,
      text: 0
    }, {
      value: 1000,
      text: 1000
    }],
    loanArrIndex: 0,
    rentArr: [{
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
    }],
    rentArrIndex: 0,
    supportArr: [{
      value: 0,
      text: 0
    }, {
      value: 1000,
      text: 1000
    }, {
      value: 2000,
      text: 2000
    }],
    supportArrIndex: 0
  },
  methods: {
    onLoad: function() {
      console.log('onload')
    },
    bindSelectChange: function(e) {
      const {
        type
      } = e.target.dataset;
      this.setData({
        [`${type}ArrIndex`]: e.detail.value
      });
    }
  },
  ready: function() {
    this.setData({
      label: this.properties.label,
      source: this.properties.source
    })
  }
})