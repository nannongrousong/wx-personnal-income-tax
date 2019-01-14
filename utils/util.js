const justShowInfo = (content) => {

};

const socialFundBase = [{
  value: 'beijing',
  text: '北京',
  socail: {
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
  socail: {
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
  socail: {
    min: 3030,
    max: 19935
  },
  fund: {
    min: 2020,
    max: 25300
  }
}];

module.exports = {
  justShowInfo,
  socialFundBase
}