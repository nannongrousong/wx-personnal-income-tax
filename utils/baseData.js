const socialFundBase = [{
  value: 'beijing',
  text: '北京',
  social: [5080, 25401],
  fund: [2273, 25401],
  insurance: {
    yanglao: [8, 19],
    yiliao: [2, 10],
    shiye: [0.2, 0.8],
    gongshang: 0.4,
    shengyu: 0.8
  }
}, {
  value: 'shanghai',
  text: '上海',
  social: [4279, 21396],
  fund: [2300, 21400],
  insurance: {
    yanglao: [8, 20],
    yiliao: [2, 9.5],
    shiye: [0.5, 0.5],
    gongshang: 0.2,
    shengyu: 1
  }
}, {
  value: 'nanjing',
  text: '南京',
  social: [3030, 19935],
  fund: [2020, 25300],
  insurance: {
    yanglao: [8, 19],
    yiliao: [2, 9],
    shiye: [0.5, 0.5],
    gongshang: 0.2,
    shengyu: 0.8
  }
}];

const getSocialFund = (city) => {
  return socialFundBase.find((item) => item.value == city);
};

const childEduArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}];
const continueEduArr = [{
  value: 1,
  text: '400（月扣）'
}, {
  value: 2,
  text: '3600（年扣）',
}];
const loanArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}];
const rentArr = [{
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
}];
const supportArr = [{
  value: 0,
  text: 0
}, {
  value: 1000,
  text: 1000
}, {
  value: 2000,
  text: 2000
}];

module.exports = {
  socialFundBase,
  getSocialFund,
  childEduArr,
  continueEduArr,
  loanArr,
  rentArr,
  supportArr
}