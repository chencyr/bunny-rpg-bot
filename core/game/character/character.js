/**
 * Character base class
 *
 */
class Character
{
    /**
     * Init player
     * @param initInfo
     * @constructor
     */
    constructor(initInfo) {
        this.name = initInfo.name;
        this.userId = initInfo.userId;
        this.level = 1;
        this.job = "無職業";
        this.title = "無稱號";
        this.state = "無狀態";
        this.levelUpExp = 300;
        this.expBase = 500;
        this.exp = 0;
        this.status = {
            hp: 100,
            maxHp: 100,
            mp: 20,
            maxMp: 20,
            str: 10,
            vit: 10,
            dex: 10,
            agi: 10,
            int: 10,
            luk: 10,
        }
    }

    computeHP() {
        throw new Error('Not implement method.');
    }

    computeMP() {
        throw new Error('Not implement method.');
    }

    computeSTR() {
        throw new Error('Not implement method.');
    }

    computeVIT() {
        throw new Error('Not implement method.');
    }

    computeDEX() {
        throw new Error('Not implement method.');
    }

    computeAGI() {
        throw new Error('Not implement method.');
    }

    computeINT() {
        throw new Error('Not implement method.');
    }

    computeLUK() {
        throw new Error('Not implement method.');
    }

    getStatus() {
        return this.status;
    }

    getName() {
        return this.name;
    }

    getJob() {
        return this.job;
    }

    getLevel() {
        return this.level;
    }

    getTitle() {
        return this.title;
    }

    getState() {
        return this.state;
    }

    getExp() {
        return this.exp;
    }

    createDamage() {
        // 傷害隨機倍率參數
        const atkParam = this.getRandom(80, 120) / 100;

        // 精准度隨機倍率參數
        const accParam = this.getRandom(80, 100) / 100;

        let value = this.status.str * atkParam * 10;
        let accuracy = this.status.dex * accParam;

        return {value: value, accuracy: accuracy};
    }

    receiveDamage(damage) {
        const result = {
            isMiss: false,
            damageHp: 0,
            isCritical: false,
            exp: 0,
        };

        // 防禦隨機倍率參數
        const defParam = this.getRandom(90, 100) / 100;

        // 迴避隨機倍率參數
        const dodgeParam = this.getRandom(90, 100) / 100;

        let value = this.status.vit * defParam * 3;
        let dodge = this.status.agi * dodgeParam;

        // 閃避補正
        let dodComp = dodge - damage.accuracy;
        if(dodComp < 0) {
            dodComp = 0;
        }
        if(dodComp > 100) {
            dodComp = 100;
        }

        // Base 20% miss
        if (this.getRandom(0, 100) <= (20 + dodComp)) {
            result.isMiss = true;
        }

        let damageHp = damage.value - value;
        if (damageHp < 0) {
            damageHp = 0;
        }

        result.damageHp = damageHp;
        this.status.hp -= damageHp;
        if (this.status.hp <= 0) {
            this.status.hp = 0;
            const decrease = this.levelUpExp * 0.1;
            result.exp = decrease;

            this.exp -= decrease;
            if (this.exp < 0) {
                this.exp = 0;
            }
        }

        result.hp = this.status.hp;


        return result;
    }

    receivedExp(exp) {
        this.exp += exp;
        let isLevelUp = false;

        if (exp >= this.levelUpExp) {
            this.levelUp();
            isLevelUp = true;
        }

        return isLevelUp;
    }

    levelUp() {
        this.level += 1;
        this.levelUpExp = (this.level) * this.expBase;

        const hp = this.status.maxHp += this.computeHP();
        const mp = this.status.maxMp += this.computeMP();
        this.status = {
            hp: hp,
            maxHp: hp,
            mp: mp,
            maxMp: mp,
            str: this.status.str += this.computeSTR(),
            vit: this.status.vit += this.computeVIT(),
            dex: this.status.dex += this.computeDEX(),
            agi: this.status.agi += this.computeAGI(),
            int: this.status.int += this.computeINT(),
            luk: this.status.luk += this.computeLUK(),
        }
    }
}

module.exports = Character;