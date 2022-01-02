const Monster = require('./monster');

/**
 * FakePlayer template class
 */
class FakePlayer extends Monster
{
    /**
     * Init player
     * @param initInfo
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        super(initInfo, context);
        this.status.template = 'fake-player';
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
        return super.toExp() * 0.9;
    }

    computeHP() {
        return this.getRandom(200, 5000);
    }

    computeMP() {
        return this.getRandom(200, 5000);
    }

    computeSP() {
        return this.getRandom(20, 500);
    }

    computeSTR() {
        return this.getRandom(3, 30);
    }

    computeVIT() {
        return this.getRandom(3, 30);
    }

    computeDEX() {
        return this.getRandom(3, 30);
    }

    computeAGI() {
        return this.getRandom(3, 30);
    }

    computeINT() {
        return this.getRandom(3, 30);
    }

    computeLUK() {
        return this.getRandom(3, 30);
    }

}

module.exports = FakePlayer;