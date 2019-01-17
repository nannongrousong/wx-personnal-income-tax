const {
  socialFundBase,
  childEduArr,
  continueEduArr,
  loanArr,
  rentArr,
  supportArr
} = require('../../utils/baseData.js');
const {
  showMoney
} = require('../../utils/index.js');
const {
  computeTax
} = require('../../utils/tax.js');

Page({
  data: {
    //  地区
    area: 'beijing',
    //  税前工资
    grossPay: '',
    formData: {

    },
    payDetail: [],
    taxDetail: []
  },
  bindAreaChange: function (e) {
    this.setData({
      area: e.detail
    }, function () {
      console.log('this.data.area', this.data.area);
    });
  },
  bindPayChange: function (e) {
    this.setData({
      grossPay: e.detail
    }, function () {
      console.log('this.data.pay', this.data.grossPay);
    });
  },
  bindFormData: function (e) {
    this.setData({
      formData: {
        ...this.data.formData,
        ...e.detail
      }
    }, function () {
      console.log('this.formData', this.data.formData);
    });
  },
  bindCompute: function (e) {
    //  核心开始计算个税
    const {
      area,
      grossPay,
      formData: {
        socialShow,
        fundShow,
        baseFundArrIndex = 0,
        suppleFundArrIndex = 0,
        childEduArrIndex = 0,
        continueEduArrIndex = 0,
        bigSick = 0,
        loanArrIndex = 0,
        rentArrIndex = 0,
        supportArrIndex = 0
      }
    } = this.data;

    const areaInfo = socialFundBase.find((item) => item.value == area);
    const {
      insurance: {
        yanglaoR,
        yiliaoR,
        shiyeR,
        gongshangR,
        shengyuR
      }
    } = areaInfo;

    //  个人花费
    const personCost = {
      yanglao: [showMoney(socialShow * yanglaoR[0] * 0.01), yanglaoR[0]],
      yiliao: [showMoney(socialShow * yiliaoR[0] * 0.01), yiliaoR[0]],
      shiye: [showMoney(socialShow * shiyeR[0] * 0.01), shiyeR[0]],
      gongshang: [0, 0],
      shengyu: [0, 0],
      baseFund: [showMoney(fundShow * baseFundArrIndex * 0.01), baseFundArrIndex],
      suppleFund: [showMoney(fundShow * suppleFundArrIndex * 0.01), suppleFundArrIndex]
    };

    //  公司花费
    const companyCost = {
      yanglao: [showMoney(socialShow * yanglaoR[1] * 0.01), yanglaoR[1]],
      yiliao: [showMoney(socialShow * yiliaoR[1] * 0.01), yiliaoR[1]],
      shiye: [showMoney(socialShow * shiyeR[1] * 0.01), shiyeR[1]],
      gongshang: [showMoney(socialShow * gongshangR * 0.01), gongshangR],
      shengyu: [showMoney(socialShow * shengyuR * 0.01), shengyuR],
      baseFund: [showMoney(fundShow * baseFundArrIndex * 0.01), baseFundArrIndex],
      suppleFund: [showMoney(fundShow * suppleFundArrIndex * 0.01), suppleFundArrIndex]
    };

    const personCostAll = Object.keys(personCost).reduce((prev, curr) => (prev + Number(personCost[curr][0])), 0);
    const companyCostAll = Object.keys(companyCost).reduce((prev, curr) => (prev + Number(companyCost[curr][0])), 0);

    const payDetailMap = {
      yanglao: '养老保险',
      yiliao: '医疗保险',
      shiye: '失业保险',
      gongshang: '工商保险',
      shengyu: '生育保险',
      baseFund: '住房公积金',
      suppleFund: '补充公积金'
    };

    let payDetail = Object.keys(payDetailMap).map((key, index) => ({
      id: index,
      type: payDetailMap[key],
      person: personCost[key][0],
      personR: personCost[key][1],
      company: companyCost[key][0],
      companyR: companyCost[key][1],
    }));

    payDetail.push({
      id: payDetail.length,
      type: '共计支出',
      person: showMoney(personCostAll),
      company: showMoney(companyCostAll)
    });

    this.setData({
      payDetail
    });

    console.log('payDetail', payDetail);

    //  附加扣除[子女教育（月扣）、继续教育（月扣400，年扣3600）、大病医疗（年扣最高80000）、贷款利息（月扣1000）、住房租金（月扣）、赡养老人（月扣）]    

    const childEduM = childEduArr[childEduArrIndex].value;
    const continueEduM = continueEduArr[continueEduArrIndex].value;
    const loanM = loanArr[loanArrIndex].value;
    const rentM = rentArr[rentArrIndex].value;
    const supportM = supportArr[supportArrIndex].value;

    let taxCost = 0;

    //  纳税详情
    const taxDetail = Array(12).fill(0).map((item, index) => {
      const month = index + 1;
      //  总工资
      const grossPayAll = grossPay * month;
      //  总享受的基本优惠额度
      const basePreferAll = 5000 * month;
      //  总五险一金
      const insuFundAll = personCostAll * month;
      //  专项附加扣除(子女教育、贷款、租房、赡养老人)
      let specailOffAll = (childEduM + loanM + rentM + supportM) * month;

      //  继续教育3600定额默认放到12月份扣，争取最大优惠
      if (month == 12 && continueEduM == 3600) {
        specailOffAll += continueEduM;
      }
      if (continueEduM == 400) {
        specailOffAll += continueEduM * month;
      }

      //  大病医疗在每年3.1到6.30，默认放到6月，争取最大优惠
      if (month == 6) {
        specailOffAll += bigSick;
      }

      //  应税工资
      let shouldTax = grossPayAll - basePreferAll - insuFundAll - specailOffAll;
      if (shouldTax <= 0) {
        shouldTax = 0;
      }
      //  根据应税工资获取 预扣率和速算扣除数
      const { taxRatio, baseOff } = computeTax(shouldTax);
      const monthTax = shouldTax * taxRatio * 0.01 - baseOff - taxCost;
      //  税后收入
      const netPay = grossPay - monthTax - personCostAll;
      //  年度总缴纳税
      taxCost +=  monthTax;

      return {
        id: index,
        month: `${index + 1}月`,
        tax: showMoney(monthTax),
        taxFormula: `${showMoney(shouldTax)}(月应税工资) = ${showMoney(grossPayAll)}(累计收入) - ${showMoney(basePreferAll)}(累计免征额度) - ${showMoney(insuFundAll)}(累计缴纳五险一金) - ${showMoney(specailOffAll)}(累计专项扣除);\r\n
          ${showMoney(monthTax)}(月扣除税) = ${showMoney(shouldTax)}(月应税工资) * ${showMoney(taxRatio)}%(预扣率) - ${showMoney(baseOff)}(速算扣除数) - ${showMoney(taxCost)}(累计扣除税).
        `,
        realLeft: showMoney(netPay),
        realLeftFormula: `${showMoney(netPay)}(税后月收入) = ${showMoney(grossPay)}(税前月收入) - ${showMoney(monthTax)}(月扣除税) - ${showMoney(personCostAll)}(月缴纳五险一金).`
      };
    });

    this.setData({
      taxDetail
    });

    console.log('taxDetail', taxDetail);
  },
  onShow: function () {

  },
  onLoad: function (options) {

  },
  onHide: function () {

  }
})