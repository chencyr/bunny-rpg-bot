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
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        super(initInfo);

        this.context = context;

        this.job = "路人";
        const hp = this.computeHP();
        const mp = this.computeMP();

        this.status.max_hp = hp;
        this.status.hp = hp;
        this.status.max_mp = mp;
        this.status.mp = mp;
        this.status.str = this.computeSTR();
        this.status.vit = this.computeVIT();
        this.status.dex = this.computeDEX();
        this.status.agi = this.computeAGI();
        this.status.int = this.computeINT();
        this.status.luk = this.computeLUK();
    }

    /**
     * Set status new value
     * @param data {Object} new values
     * @return this
     */
    setStatus(data) {
        this.status = Object.assign(this.status, data);
        return this;
    }

    /**
     * Store status into database
     * @return this
     */
    async storeStatus() {
        await this.context.characterModel().insert(this.status);
        return this;
    }

    /**
     * Get random number.
     * @param min
     * @param max
     * @return {*}
     */
    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
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

module.exports = Player;