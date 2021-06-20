const NormalState = require('./state/normal');
const DeadState = require('./state/dead');

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

        this.status = {
            user_id: initInfo.user_id,
            name: initInfo.name,
            next_exp: 300,
            exp: 0,
            level: 1,
            hp: 100,
            max_hp: 100,
            mp: 20,
            max_sp: 100,
            sp: 20,
            max_mp: 20,
            str: 10,
            vit: 10,
            dex: 10,
            agi: 10,
            int: 10,
            luk: 10,
        };


        this.revive_timer = 0; // sec
        this.revive_limit = 300; // sec

        this.job = "無職業";
        this.title = "無稱號";
        this.state = Character.createState(NormalState.name(), this);

        this.skills = {};
    }

    /**
     * Convert the object to exp value.
     * @return {number}
     */
    toExp() {
        const status = this.status;
        const exp = (status.max_hp / 10) + (status.max_mp / 10)
            + status.str
            + status.vit
            + status.dex
            + status.agi
            + status.int
            + status.luk;

        return exp;
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
     * Set characters skills.
     * @param skills
     * @return {Character}
     */
    setSkills(skills) {
        for (let i in skills) {
            const skill = skills[i];
            this.skills[skill.standard_name] = {
                id: skill.skill_id,
                standard_name: skill.standard_name,
                display_name: skill.display_name,
                level: skill.skill_lv,
                type: skill.type,
            };
        }

        return this;
    }

    /**
     * Check character has skill.
     * @param standardName
     * @return
     */
    hasSkill(standardName) {
        return this.skills.hasOwnProperty(standardName);
    }

    /**
     * Get skill info
     * @param standardName
     */
    getSkill(standardName) {
        return this.skills[standardName];
    }


    /**
     * Create new state instance.
     * @param name {string}
     * @param context
     * @return {Normal}
     */
    static createState(name, context) {
        if (name == NormalState.name()) {
            return new NormalState(context);
        }
        if (name == DeadState.name()) {
            return new DeadState(context);
        }

        throw new Error("Change to unknown state error.");
    }

    static States = {
        Normal: NormalState,
        Dead: DeadState,
    };

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
        throw new Error('Not implement method.');
    }

    computeMP() {
        throw new Error('Not implement method.');
    }

    computeSP() {
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
        return this.status.name;
    }

    getJob() {
        return this.job;
    }

    getLevel() {
        return this.status.level;
    }

    getTitle() {
        return this.title;
    }

    getState() {
        return this.state;
    }

    getExp() {
        return this.status.exp;
    }

    getNextExp() {
        return this.status.next_exp;
    }

    afterCostHP(value) {
        return this.status.hp - value.hp;
    }

    afterCostMP(value) {
        return this.status.mp - value.mp;
    }

    afterCostSP(value) {
        return this.status.sp - value.sp;
    }

    costHP(value) {
        this.status.hp = this.afterCostHP(value);
    }

    costMP(value) {
        this.status.mp = this.afterCostMP(value);
    }

    costSP(value) {
        this.status.sp = this.afterCostSP(value);
    }

    /**
     * Change state to new state
     * @param name
     */
    changeState(name) {
        this.state.down();
        this.state = Character.createState(name, this);
        this.state.up();

        return this;
    }

    /**
     * Create damage for attack other object.
     * @return {{accuracy: number, value: number}}
     */
    createDamage() {
        return this.state.createDamage();
    }

    /**
     * Received other object's damage.
     * @param damage
     * @return {{isDodge: boolean, isCritical: boolean, exp: number, damageHp: number}}
     */
    receiveDamage(damage) {
        return this.state.receiveDamage(damage);
    }

    /**
     * Received exp
     * @param exp
     * @return {boolean}
     */
    receivedExp(exp) {
        this.status.exp += exp;
        let isLevelUp = false;

        while (this.status.exp >= this.status.next_exp) {
            this.levelUp();
            isLevelUp = true;
        }

        return isLevelUp;
    }

    /**
     * Level up
     */
    levelUp() {
        this.status.level += 1;
        this.status.next_exp = this.computeNextExp();

        const hp = this.status.max_hp += this.computeHP();
        const mp = this.status.max_mp += this.computeMP();
        const newStatus = Object.assign(this.status,{
            hp: hp,
            max_hp: hp,
            mp: mp,
            max_mp: mp,
            str: this.status.str += this.computeSTR(),
            vit: this.status.vit += this.computeVIT(),
            dex: this.status.dex += this.computeDEX(),
            agi: this.status.agi += this.computeAGI(),
            int: this.status.int += this.computeINT(),
            luk: this.status.luk += this.computeLUK(),
        });

        this.setStatus(newStatus);
    }

    /**
     * Compute next level exp value
     * @return {number}
     */
    computeNextExp() {
        return this.fib(this.status.level);
    }

    /**
     * Fibonacci function
     * @param num
     * @return {*}
     */
    fib(num) {
        if (num < 2) return num
        const arr = [0, 498]
        for (let i = 2; i <= num; i++) {
            arr[i] = arr[i-1] + (arr[i-2])
        }
        return arr[num]
    }
}

module.exports = Character;