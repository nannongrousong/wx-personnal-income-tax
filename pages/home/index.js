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
const bmap = require('../../libs/bmap-wx.min.js');
const { 
  bMapAK 
} = require('../../config/global');

Page({
  data: {
    //  地区
    area: 'beijing',
    //  税前工资
    grossPay: '',
    formData: {

    },
    payDetail: [],
    taxDetail: [],
    footerStyle: ''
  },
  bindAreaChange: function(e) {
    this.setData({
      area: e.detail
    }, function() {
      console.log('this.data.area', this.data.area);
    });
  },
  bindPayChange: function(e) {
    this.setData({
      grossPay: e.detail
    }, function() {
      console.log('this.data.pay', this.data.grossPay);
    });
  },
  bindFormData: function(e) {
    this.setData({
      formData: {
        ...this.data.formData,
        ...e.detail
      }
    }, function() {
      console.log('this.formData', this.data.formData);
    });
  },
  bindCompute: function(e) {
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

    if (grossPay == '' || grossPay == 0) {
      return;
    }

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

    //  附加扣除[子女教育(月扣)、继续教育(月扣400，年扣3600)、大病医疗(年扣最高80000)、贷款利息(月扣1000)、住房租金(月扣)、赡养老人(月扣)]    

    const childEduM = childEduArr[childEduArrIndex].value;
    const continueEduM = continueEduArr[continueEduArrIndex].value;
    const loanM = loanArr[loanArrIndex].value;
    const rentM = rentArr[rentArrIndex].value;
    const supportM = supportArr[supportArrIndex].value;

    //  累计缴纳税
    let taxCost = 0;
    //  累计总工资
    let grossPayAll = 0;
    //  累计免税收入
    let basePreferAll = 0;
    //  累计五险一金
    let insuFundAll = 0;
    //  累计专项附加扣除
    let specailOffAll = 0;
    //  累计到手收入
    let leftAll = 0;

    //  纳税详情
    const taxDetail = Array(12).fill(0).map((item, index) => {
      const month = index + 1;
      //  累计总工资
      grossPayAll = grossPay * month;
      //  累计免税收入
      basePreferAll = 5000 * month;
      //  累计五险一金
      insuFundAll = personCostAll * month;
      //  累计专项附加扣除(子女教育、贷款、租房、赡养老人)
      specailOffAll = (childEduM + loanM + rentM + supportM) * month;

      //  继续教育
      if (continueEduM == 400) {
        //  学历教育，每月扣
        specailOffAll += continueEduM * month;
      } else if (continueEduM == 3600 && month == 12) {
        //  职业资格教育，年度只扣一次，默认放到12月份扣，争取最大优惠
        specailOffAll += continueEduM;
      } else if (continueEduM == 4000) {
        //  学历教育+职业资格教育
        specailOffAll += 400 * month;
        if (month == 12) {
          specailOffAll += 3600;
        }
      }

      //  应税工资
      let shouldTax = grossPayAll - basePreferAll - insuFundAll - specailOffAll;
      if (shouldTax <= 0) {
        shouldTax = 0;
      }
      //  根据应税工资获取 预扣率和速算扣除数
      const {
        taxRatio,
        baseOff
      } = computeTax(shouldTax);
      //  本期应预扣预缴税额
      const monthTax = shouldTax * taxRatio * 0.01 - baseOff - taxCost;
      //  扣除税公式
      const taxFormula = `${showMoney(shouldTax)}(累计预扣预缴应纳税所得额) = ${showMoney(grossPayAll)}(累计收入) - ${showMoney(basePreferAll)}(累计免税收入) - ${showMoney(insuFundAll)}(累计五险一金) - ${showMoney(specailOffAll)}(累计专项附加扣除)
      ${showMoney(monthTax < 0 ? 0 : monthTax)}${monthTax < 0 ? `(实:${showMoney(monthTax)})` : ''}(本期应预扣预缴税额) = ${showMoney(shouldTax)}(累计预扣预缴应纳税所得额) * ${showMoney(taxRatio)}%(预扣率) - ${showMoney(baseOff)}(速算扣除数) - ${showMoney(taxCost)}(累计已预扣预缴税额)`;
      //  税后收入
      const netPay = grossPay - (monthTax < 0 ? 0 : monthTax) - personCostAll;
      //  税后收入公式
      const realLeftFormula = `${showMoney(netPay)}(税后月收入) = ${showMoney(grossPay)}(税前月收入) - ${showMoney(monthTax < 0 ? 0 : monthTax)}(本期应预扣预缴税额) - ${showMoney(personCostAll)}(月缴纳五险一金)`;
      //  年度总缴纳税
      taxCost += monthTax;
      //  累计到手收入
      leftAll += netPay;

      return {
        id: index,
        month: `${index + 1}月`,
        tax: showMoney(monthTax),
        taxFormula,
        realLeft: showMoney(netPay),
        realLeftFormula
      };
    });

    //  第十二月还为负数
    if (taxDetail[11].tax < 0) {
      taxDetail.push({
        id: taxDetail.length,
        month: '汇算清缴退税[多退]',
        tax: showMoney(Math.abs(taxDetail[11].tax)),
        taxFormula: '/',
        realLeft: '/',
        realLeftFormula: '/'
      });
    }

    if (bigSick > 0) {
      //  开始计算退税
      //  新-应税收入
      const newShouldTax = grossPayAll - basePreferAll - insuFundAll - specailOffAll - bigSick;
      const {
        taxRatio,
        baseOff
      } = computeTax(newShouldTax);
      //  新-累计税
      const newYearTax = newShouldTax * taxRatio * 0.01 - baseOff;
      //  >0退税，不太应该小于0
      const returnTax = taxCost - newYearTax;
      taxDetail.push({
        id: taxDetail.length,
        month: '汇算清缴退税[大病医疗]',
        tax: showMoney(returnTax),
        taxFormula: `${showMoney(newShouldTax)}(累计应税工资) = ${showMoney(grossPayAll)}(累计收入) - ${showMoney(basePreferAll)}(累计免税收入) - ${showMoney(insuFundAll)}(累计五险一金) - ${showMoney(specailOffAll + bigSick)}(累计专项附加扣除);
      ${showMoney(newYearTax)}(实际累计税) = ${showMoney(newShouldTax)}(累计应税工资) * ${taxRatio}%(预扣率) - ${showMoney(baseOff)}(速算扣除数);
      ${showMoney(returnTax)}(退税) = ${showMoney(taxCost)}(已预扣预缴税额) - ${showMoney(newYearTax)}(实际累计税).
      `,
        realLeft: '/',
        realLeftFormula: '/'
      });
    }

    taxDetail.push({
      id: taxDetail.length,
      month: '累计',
      tax: showMoney(taxCost),
      taxFormula: '/',
      realLeft: showMoney(leftAll),
      realLeftFormula: '/'
    });

    this.setData({
      taxDetail
    });

    console.log('taxDetail', taxDetail);
    console.log('总taxCost', taxCost);

    this.setData({
      footerStyle: 'position-rela'
    });
  },
  onLoad: function(options) {
    wx.showShareMenu({

    });
    
    const BMap = new bmap.BMapWX({
      ak: bMapAK
    });

    BMap.regeocoding({
      fail: function (res) {
        console.log('fail', res);
      },
      success: function (res) {
        console.log('success', res);
      }
    });


    const {
      windowHeight
    } = wx.getSystemInfoSync();
    const that = this;

    wx.createSelectorQuery().select('.container').boundingClientRect(function(rect) {
      if (rect.height + 40 > windowHeight) {
        that.setData({
          footerStyle: 'position-rela'
        });
      }
    }).exec();
  },
  onShareAppMessage: function(options) {

  },
  bindSelfShare: function(e) {
    wx.showModal({
      content: '觉得该小程序不错？\r\n点击页面右上角 ... 将小程序分享给好友吧~',
      showCancel: false
    });
  }
})