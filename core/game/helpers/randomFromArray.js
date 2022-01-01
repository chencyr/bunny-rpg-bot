/**
 * Random item from list array
 * @param list {array}
 *
 * @return {mixed}
 */
const randomFromArray = function(list) {
    return list[Math.floor(Math.random() * list.length)];
};

module.exports = randomFromArray;