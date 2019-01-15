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

module.exports = {
  socialFundBase,
  getSocialFund
}