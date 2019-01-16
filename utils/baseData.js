const socialFundBase = [{
  value: 'beijing',
  text: '北京',
  social: [5080, 25401],
  fund: [2273, 25401],
  insurance: {
    yanglaoR: [8, 19],
    yiliaoR: [2, 10],
    shiyeR: [0.2, 0.8],
    gongshangR: 0.4,
    shengyuR: 0.8,
    fundR: 12
  }
}, {
  value: 'shanghai',
  text: '上海',
  social: [4279, 21396],
  fund: [2300, 21400],
  insurance: {
    yanglaoR: [8, 20],
    yiliaoR: [2, 9.5],
    shiyeR: [0.5, 0.5],
    gongshangR: 0.2,
    shengyuR: 1,
    fundR: 7
  }
}, {
  value: 'nanjing',
  text: '南京',
  social: [3030, 19935],
  fund: [2020, 25300],
  insurance: {
    yanglaoR: [8, 19],
    yiliaoR: [2, 9],
    shiyeR: [0.5, 0.5],
    gongshangR: 0.2,
    shengyuR: 0.8,
    fundR: 8
  }
}];

const getSocialFund = (city) => {
  return socialFundBase.find((item) => item.value == city);
};

const childEduArr = [{
  value: 0,
  text: 0
}, {
  value: 500,
  text: 500
}, {
  value: 1000,
  text: 1000
}, {
  value: 1500,
  text: 1500
}, {
  value: 2000,
  text: 2000
}];
const continueEduArr = [{
  value: 0,
  text: 0,
}, {
  value: 400,
  text: '400（月扣）'
}, {
  value: 3600,
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