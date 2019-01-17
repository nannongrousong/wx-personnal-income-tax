const showMoney = (money) => (isNaN(Number(money)) ? '' : Number(Number(money).toFixed(2)));

module.exports = {
    showMoney
};