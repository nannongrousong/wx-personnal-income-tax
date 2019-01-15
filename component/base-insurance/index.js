const baseFundArr = Array(13).fill(0).map((v, index) => ({
  value: index,
  text: `${index}%`
}));
const suppleFundArr = Array(13).fill(0).map((v, index) => ({
  value: index,
  text: `${index}%`
}));
const {
  getSocialFund
} = require('../../utils/util.js');
const computeShow = (pay, base) => {
  if (pay <= base.min) {
    return base.min;
  } else if (pay >= base.max) {
    return base.max;
  } else {
    return pay;
  }
};

Component({
  properties: {
    grossPay: {
      type: Number,
      value: 0,
      observer: function(newVal, oldVal, changedPath) {
        const {
          area,
          formData
        } = this.properties;

        const {
          social,
          fund
        } = getSocialFund(area);

        const {
          socialChecked,
          fundChecked
        } = this.data;

        const socialShow = socialChecked ? formData.socialShow : computeShow(newVal, social);
        const fundShow = fundChecked ? formData.fundShow : computeShow(newVal, fund);

        this.triggerEvent('FormData', {
          socialShow,
          fundShow
        });
      }
    },
    area: {
      type: String,
      value: ''
    },
    formData: {
      type: Object,
      value: {}
    }
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
    bindSelectChange: function(e) {
      const {
        type
      } = e.target.dataset;
      this.setData({
        [`${type}ArrIndex`]: e.detail.value
      });
    },
    bindCheckChange: function(e) {
      const {
        type
      } = e.target.dataset;
      const {
        grossPay,
        area
      } = this.properties;
      const {
        social,
        fund
      } = getSocialFund(area);

      if (type == 'social' || type == 'fund') {
        //  自定义取消勾选后强制重新计算
        let newState = !this.data[`${type}Checked`];
        if (newState === false) {
          this.triggerEvent('FormData', {
            [`${type}Show`]: computeShow(grossPay, type == 'social' ? social : fund)
          });
        }
      }
      this.setData({
        [`${type}Checked`]: !this.data[`${type}Checked`]
      });
    },
    bindBaseInputChange: function(e) {
      const {
        type
      } = e.target.dataset;
      this.triggerEvent('FormData', {
        [`${type}Show`]: e.detail.value
      });
    }
  },
  ready: function() {
    const {
      area,
      formData
    } = this.properties;
    const {
      social,
      fund
    } = getSocialFund(area);

    this.setData({
      formData
    });

    this.triggerEvent('FormData', {
      socialShow: social.min,
      fundShow: fund.min
    });
  }
})