const showMoney = (money) => (isNaN(Number(money)) ? '' : Number(money).toFixed(2));

module.exports = {
    showMoney
};