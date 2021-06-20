const Character = require('../character');

/**
 * Monster base class
 *
 */
class Monster extends Character
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

        this.job = "初級怪物";
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
        this.status.id = this.generateID();
    }

    /**
     * Generate character ID.
     * @return {string}
     */
    generateID() {
        const timestamp = new Date().getTime();
        const random = this.getRandom(100000, 999999);
        const id = `monster_${timestamp}_${random}`;

        console.info("Action: Generate monster ", id);
        return id;

    }

    computeHP() {
        return this.getRandom(1, 100);
    }

    computeMP() {
        return this.getRandom(1, 100);
    }

    computeSP() {
        return this.getRandom(1, 100);
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

module.exports = Monster;