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
        super(initInfo, context);

        this.job = "初心者";
        const hp = this.computeHP();
        const mp = this.computeMP();
        const sp = this.computeSP();

        this.status.max_hp = hp;
        this.status.hp = hp;
        this.status.max_mp = mp;
        this.status.mp = mp;
        this.status.max_sp = sp;
        this.status.sp = sp;
        this.status.str = this.computeSTR();
        this.status.vit = this.computeVIT();
        this.status.dex = this.computeDEX();
        this.status.agi = this.computeAGI();
        this.status.int = this.computeINT();
        this.status.luk = this.computeLUK();
    }

    /**
     * Store status into database
     * @param updateMode {boolean}
     * @return this
     */
    async storeStatus(updateMode) {
        if(updateMode) {
            await this.context.characterModel().updateById(this.status.id, this.status);
        }
        else {
            await this.context.characterModel().create(this.status);
        }

        return this;
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

    /**
     * Received exp
     * @param exp
     * @return {boolean}
     */
    receivedExp(exp) {
        let isLevelUp = super.receivedExp(exp);
        this.storeStatus(true);

        return isLevelUp;
    }
}

module.exports = Player;