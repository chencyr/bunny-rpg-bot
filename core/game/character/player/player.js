const Character = require('../character');

/**
 * Player base class
 *
 */
class Player extends Character
{
    /**
     * Init player
     * @param initInfo
     * @constructor
     */
    constructor(initInfo) {
        super(initInfo);
        this.job = "路人";

        this.status = {
            hp: this.computeHP(),
            mp: this.computeMP(),
            str: this.computeSTR(),
            vit: this.computeVIT(),
            dex: this.computeDEX(),
            agi: this.computeAGI(),
            int: this.computeINT(),
            luk: this.computeLUK(),
        }
    }

    getRandom(min,max){
        return Math.floor(Math.random()*(max-min+1))+min;
    };

    computeHP() {
        return this.getRandom(100, 500);
    }

    computeMP() {
        return this.getRandom(20, 500);
    }

    computeSTR() {
        return this.getRandom(10, 30);
    }

    computeVIT() {
        return this.getRandom(10, 30);
    }

    computeDEX() {
        return this.getRandom(10, 30);
    }

    computeAGI() {
        return this.getRandom(10, 30);
    }

    computeINT() {
        return this.getRandom(10, 30);
    }

    computeLUK() {
        return this.getRandom(10, 30);
    }

}

module.exports = Character;