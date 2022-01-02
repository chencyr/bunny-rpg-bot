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
     * Monster auto attack actions.
     * @return {string[]}
     */
    autoActions() {
        return [
            {name: 'attack'},
            {name: 'stick-attack'},
        ];
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