/**
 * Random item from list array
 * @param list {array}
 *
 * @return {mixed}
 */
const fn = function randomFromArray(list) {
    return list[Math.floor(Math.random() * list.length)];
};

module.exports = fn;