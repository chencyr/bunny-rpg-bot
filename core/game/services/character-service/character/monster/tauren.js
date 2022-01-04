const Monster = require('./monster');

/**
 * Tauren template class
 */
class Tauren extends Monster
{
    /**
     * Init player
     * @param initInfo
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        super(initInfo, context);
        this.status.template = 'tauren';
    }

    /**
     * Convert the object to coin
     * @return {number}
     */
    toCoin() {
        const min = 50, max = 300, bonus = 15;
        return this.getCoinCalculator()(this, {min, max}, bonus);
    }

    /**
     * Monster auto attack actions.
     * @return {string[]}
     */
    autoActions() {
        return [
            {name: 'attack'},
        ];
    }

    toExp() {
        return super.toExp() * 3;
    }

    computeHP() {
        return this.getRandom(1, 7500);
    }

    computeMP() {
        return this.getRandom(1, 1000);
    }

    computeSP() {
        return this.getRandom(1, 500);
    }

    computeSTR() {
        return this.getRandom(1, 40);
    }

    computeVIT() {
        return this.getRandom(1, 40);
    }

    computeDEX() {
        return this.getRandom(1, 20);
    }

    computeAGI() {
        return this.getRandom(1, 20);
    }

    computeINT() {
        return this.getRandom(1, 5);
    }

    computeLUK() {
        return this.getRandom(1, 30);
    }

}

module.exports = Tauren;