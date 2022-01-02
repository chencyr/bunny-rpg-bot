/**
 * Random item from list object
 * @param obj {array}
 *
 * @return {mixed}
 */
const randomKeyFromObject = function (obj) {
    let keys = Object.keys(obj);
    return keys[ keys.length * Math.random() << 0];
};

module.exports = randomKeyFromObject;