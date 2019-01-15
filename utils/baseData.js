const socialFundBase = [{
  value: 'beijing',
  text: '北京',
  social: {
    min: 5080,
    max: 25401
  },
  fund: {
    min: 2273,
    max: 25401
  }
}, {
  value: 'shanghai',
  text: '上海',
  social: {
    min: 4279,
    max: 21396
  },
  fund: {
    min: 2300,
    max: 21400
  }
}, {
  value: 'nanjing',
  text: '南京',
  social: {
    min: 3030,
    max: 19935
  },
  fund: {
    min: 2020,
    max: 25300
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