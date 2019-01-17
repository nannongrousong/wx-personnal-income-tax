const {
  childEduArr,
  continueEduArr,
  loanArr,
  rentArr,
  supportArr
} = require('../../utils/baseData.js');

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
        let updateData = {
          [`${type}ArrIndex`]: e.detail.value
        };

        //  贷款和住房租金 只能享受一个
        if (type == 'loan') {
          updateData.rentArrIndex = 0;
        }

        if (type == 'rent') {
          updateData.loanArrIndex = 0;
        }

        this.triggerEvent('FormData', updateData);
      }
    },
    bindShowIntro: function(e) {
      const {
        type
      } = e.target.dataset;
      const typeIntro = {
        childEdu: `1、按照每个子女每月1000元的标准定额扣除；\r\n2、可选择一方按扣除标准的100%扣除，也可选择双方分别按扣除标准的50%扣除。`,
        continueEdu: `1、接受学历（学位）继续教育的支出，在教育期间按照每月400元定额扣除。\r\n2、接受技能人员、专业技术人员职业资格继续教育的支出，在取得相关证书的当年，按照3600元定额扣除。`,
        bigSick: `在一个纳税年度内，纳税人发生的与基本医保相关的医药费用支出，扣除医保报销后个人负担（指医保目录范围内的自付部分）累计超过15000元的部分，由纳税人在办理年度汇算清缴时，在80000元限额内据实扣除。`,
        loan: `1、纳税人本人或者配偶发生的首套住房贷款利息支出，按每月1000元的标准定额扣除；\r\n2、由购买方按扣除标准的100%扣除，也可以由夫妻双方分别按扣除标准的50%扣除`,
        rent: `1、直辖市、省会（首府）城市、计划单列市以及国务院确定的其他城市，扣除标准为每月1500元；\r\n2、除第一项所列城市以外，市辖区户籍人口超过100万的城市，扣除标准为每月1100元；\r\n3、市辖区户籍人口不超过100万的城市，扣除标准为每月800元。`,
        support: `1、纳税人为独生子女的，按照每月2000元的标准定额扣除；\r\n2、纳税人为非独生子女的，由其与兄弟姐妹分摊每月2000元的扣除额度，每人分摊的额度不能超过每月1000元。`
      };

      wx.showModal({
        content: typeIntro[type],
        showCancel: false,
        confirmText: '确定'
      })
    }
  },
  ready: function() {

  }
})