const Monster = require('./monster');

/**
 * DarkKnight template class
 */
class DarkKnight extends Monster
{
    /**
     * Init player
     * @param initInfo
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        super(initInfo, context);
        this.status.template = 'dark-knight';
    }

    /**
     * Convert the object to coin
     * @return {number}
     */
    toCoin() {
        const min = 50, max = 600, bonus = 20;
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
        return super.toExp() * 4;
    }

    computeHP() {
        return this.getRandom(1, 8500);
    }

    computeMP() {
        return this.getRandom(1, 6000);
    }

    computeSP() {
        return this.getRandom(1, 900);
    }

    computeSTR() {
        return this.getRandom(1, 60);
    }

    computeVIT() {
        return this.getRandom(1, 60);
    }

    computeDEX() {
        return this.getRandom(1, 45);
    }

    computeAGI() {
        return this.getRandom(1, 45);
    }

    computeINT() {
        return this.getRandom(1, 45);
    }

    computeLUK() {
        return this.getRandom(1, 10);
    }

}

module.exports = DarkKnight;