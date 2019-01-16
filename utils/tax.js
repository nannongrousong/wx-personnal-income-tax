const computeTax = (shouldTax) => {
    if (shouldTax <= 36000) {
        return {
            taxRatio: 3,
            baseOff: 0
        };
    } else if (shouldTax <= 144000) {
        return {
            taxRatio: 10,
            baseOff: 2520
        };
    } else if (shouldTax <= 300000) {
        return {
            taxRatio: 20,
            baseOff: 16920
        };
    } else if (shouldTax <= 420000) {
        return {
            taxRatio: 25,
            baseOff: 31920
        };
    } else if (shouldTax <= 660000) {
        return {
            taxRatio: 30,
            baseOff: 52920
        };
    } else if (shouldTax <= 960000) {
        return {
            taxRatio: 35,
            baseOff: 85920
        };
    } else {
        return {
            taxRatio: 45,
            baseOff: 181920
        };
    }
};

module.exports = {
    computeTax
};