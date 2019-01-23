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
} = require('../../utils/baseData.js');
const computeBaseShow = (pay, base) => {
  if (pay <= base[0]) {
    return {
      val: base[0],
      text: '(下限)'
    };
  } else if (pay >= base[1]) {
    return {
      val: base[1],
      text: '(上限)'
    };
  } else {
    return {
      val: pay,
      text: ''
    };
  }
};

Component({
  properties: {
    grossPay: {
      type: String,
      value: '',
      observer: function(newVal, oldVal, changedPath) {
        //  工资变化。社保基数、公积金基数变化
        const {
          area,
          grossPay,
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

        const socialShowInfo = computeBaseShow(grossPay, social);
        const fundShowInfo = computeBaseShow(grossPay, fund);

        const socialShow = socialChecked ? formData.socialShow : socialShowInfo.val;
        const fundShow = fundChecked ? formData.fundShow : fundShowInfo.val;
        const socialShowText = socialShowInfo.text;
        const fundShowText = fundShowInfo.text;

        this.setData({
          socialShowText,
          fundShowText
        });

        this.triggerEvent('FormData', {
          socialShow: Number(socialShow),
          fundShow: Number(fundShow)
        });
      }
    },
    area: {
      type: String,
      value: '',
      observer: function(newVal, oldVal, changedPath) {
        //  地区更改后。社保基数、公积金基数、公积金默认比例 变化
        const {
          social,
          fund,
          insurance: {
            fundR
          }
        } = getSocialFund(newVal);
        const {
          socialChecked,
          fundChecked
        } = this.data;
        const {
          formData,
          grossPay
        } = this.properties;

        const socialShowInfo = computeBaseShow(grossPay, social);
        const fundShowInfo = computeBaseShow(grossPay, fund);

        const socialShow = socialChecked ? formData.socialShow : socialShowInfo.val;
        const fundShow = fundChecked ? formData.fundShow : fundShowInfo.val;
        const socialShowText = socialShowInfo.text;
        const fundShowText = fundShowInfo.text;

        this.triggerEvent('FormData', {
          baseFundArrIndex: Number(fundR),
          socialShow: Number(socialShow),
          fundShow: Number(fundShow)
        });

        this.setData({
          socialShowText,
          fundShowText
        });
      }
    },
    formData: {
      type: Object,
      value: {},
      observer: function(newVal, oldVal, changedPath) {
        const {
          formData
        } = this.properties;

        const {
          suppleFundArrIndex = 0,
            baseFundArrIndex = 0
        } = formData;
        this.setData({
          formData,
          suppleFundArrIndex,
          baseFundArrIndex
        });
      }
    }
  },
  data: {
    baseFundArr,
    baseFundArrIndex: 0,
    suppleFundArr,
    suppleFundArrIndex: 0,
    socialChecked: false,
    fundChecked: false,
    socialShowText: '(下限)',
    fundShowText: '(下限)',
    socialFocusStyle: '',
    fundFocusStyle: ''
  },
  methods: {
    bindSelectChange: function(e) {
      const {
        type
      } = e.target.dataset;
      this.triggerEvent('FormData', {
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
            [`${type}Show`]: computeBaseShow(grossPay, type == 'social' ? social : fund).val
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
    },
    bindBaseInputFocus: function(e) {
      const {
        type
      } = e.target.dataset;

      this.setData({
        [`${type}FocusStyle`]: 'y-input-focus'
      });
    },
    bindBaseInputBlur: function(e) {
      const {
        type
      } = e.target.dataset;

      this.setData({
        [`${type}FocusStyle`]: ''
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
      fund,
      insurance: {
        fundR
      }
    } = getSocialFund(area);

    this.setData({
      formData
    });

    this.triggerEvent('FormData', {
      socialShow: social[0],
      fundShow: fund[0],
      baseFundArrIndex: fundR
    });
  }
})