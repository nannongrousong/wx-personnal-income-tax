const baseFundArr = Array(13).fill(0).map((v, index) => ({
  value: index,
  text: `${index}%`
}));
const suppleFundArr = Array(13).fill(0).map((v, index) => ({
  value: index,
  text: `${index}%`
}));

Component({
  properties: {

  },
  data: {
    baseFundArr,
    baseFundArrIndex: 0,
    suppleFundArr,
    suppleFundArrIndex: 0,
    socialChecked: false,
    fundChecked: false,
    baseFundChecked: true,
    suppleFundChecked: false
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
    },
    bindCheckChange: function(e) {
      const { type } = e.target.dataset;
      this.setData({
        [`${type}Checked`]: !this.data[`${type}Checked`]
      });
    }
  },
  ready: function() {

  }
})