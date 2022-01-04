const Monster = require('./monster');

/**
 * Goblin template class
 */
class Goblin extends Monster
{
    /**
     * Init player
     * @param initInfo
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        super(initInfo, context);
        this.status.template = 'goblin';
    }

    /**
     * Convert the object to coin
     * @return {number}
     */
    toCoin() {
        const min = 50, max = 100, bonus = 10;
        return this.getCoinCalculator()(this, {min, max}, bonus);
    }

    /**
     * Monster auto attack actions.
     * @return {string[]}
     */
    autoActions() {
        return [
            {name: 'attack'},
            {name: 'stick-attack'},
        ];
    }

    toExp() {
        return super.toExp() * 2;
    }

    computeHP() {
        return this.getRandom(1, 2500);
    }

    computeMP() {
        return this.getRandom(1, 2500);
    }

    computeSP() {
        return this.getRandom(1, 500);
    }

    computeSTR() {
        return this.getRandom(1, 30);
    }

    computeVIT() {
        return this.getRandom(1, 15);
    }

    computeDEX() {
        return this.getRandom(1, 30);
    }

    computeAGI() {
        return this.getRandom(1, 20);
    }

    computeINT() {
        return this.getRandom(1, 5);
    }

    computeLUK() {
        return this.getRandom(1, 5);
    }

}

module.exports = Goblin;