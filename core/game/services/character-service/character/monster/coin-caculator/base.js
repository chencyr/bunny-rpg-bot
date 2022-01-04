

function BaseCoinCalculator(character, baseRange, bonusParam) {
    const {min, max} = baseRange;
    const bonus = character.getRandom(bonusParam, character.getLevel() * bonusParam);
    return character.getRandom(min, max) + bonus;
}

module.exports = BaseCoinCalculator;