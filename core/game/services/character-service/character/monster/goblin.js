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
            {name: 'ident'},
        ];
    }

    computeHP() {
        return this.getRandom(1, 2000);
    }

    computeMP() {
        return this.getRandom(1, 2000);
    }

    computeSP() {
        return this.getRandom(1, 500);
    }

    computeSTR() {
        return this.getRandom(1, 20);
    }

    computeVIT() {
        return this.getRandom(1, 20);
    }

    computeDEX() {
        return this.getRandom(1, 20);
    }

    computeAGI() {
        return this.getRandom(1, 20);
    }

    computeINT() {
        return this.getRandom(1, 20);
    }

    computeLUK() {
        return this.getRandom(1, 20);
    }

}

module.exports = Goblin;