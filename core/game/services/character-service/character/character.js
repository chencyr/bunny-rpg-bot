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

        this.buffs = [];
        this.skills = {};

        this.setBuffs(initInfo.buffs);
    }

    /**
     * Set buff class list.
     *
     * @param buffs {array|undefined} [StandardBuff Class, StandardBuff Class, ...]
     */
    setBuffs(buffs) {
        // TODO set by collection/object.
        // TODO fix set duplicate buff problem

        buffs = buffs || [];

        for(let i in buffs) {
            const buffClass = buffs[i];
            const buff = new buffClass(this);
            this.receiveBuff(buff);
        }
    }

    /**
     * Remove buff for the character
     * @param buff
     */
    removeBuff(buff) {
        const buffs = this.getBuffs();
        for(let i = 0; i < buffs.length; i++){
            const currentBuff = buffs[i];
            if(currentBuff === buff) {
                console.info(`Delete buff ${buff.getDisplayName()} from character ${this.getName()}`);
                buffs.splice(i, 1);
            }
        }
    }

    /**
     * Get current buff list.
     * @return {Array}
     */
    getBuffs() {
        return this.buffs;
    }

    /**
     * Receive a buff for the character
     * @param Buff {StandardBuff}
     *
     * @return {Object}
     */
    receiveBuff(buff) {

        buff.setCharacter(this);

        if(buff.immediately) {
            buff.trigger();
        }

        this.buffs.push(buff);
        // TODO check can receiving

        return {
            isFail: false,
            failReason: () => "Unknown",
            buff: buff,
        };
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
     * Check self's state
     * @param name {string}
     * @return {boolean}
     */
    isState(name) {
        return Character.isState(this, name);
    }

    /**
     * Check GameObject state.
     * @param object
     * @param stateName {string}
     * @return {boolean}
     */
    static isState(object, stateName) {
        const State = Character.getState(stateName);
        return (object.state instanceof State);
    }

    /**
     * Get State class.
     * @param name
     * @return {[string, (Normal | Dead)]}
     */
    static getState(name) {
        for (const [Enum, State] of Object.entries(Character.States)) {
            if (name == State.name()) {
                return State;
            }
        }

        throw new Error("Get unknown state error.");
    }

    /**
     * Create new state instance.
     * @param name {string}
     * @param context
     * @return {Normal}
     */
    static createState(name, context) {
        const State = Character.getState(name);
        return new State(context);
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

    /**
     *
     * @return {{vit: number, agi: number, mp: number, luk: number, level: number, hp: number, max_hp: number, int: number, str: number, max_mp: number, user_id: *, dex: number, max_sp: number, name: *, next_exp: number, exp: number, sp: number}|*}
     */
    getStatus() {
        // TODO remove
        throw new Error("Remove the method.");
        return this.status;
    }

    /**
     * Get character name.
     * @return {*}
     */
    getName() {
        return this.status.name;
    }

    /**
     * Get character job.
     * @return {string}
     */
    getJob() {
        return this.job;
    }

    /**
     * Get character level.
     * @return {number}
     */
    getLevel() {
        return this.status.level;
    }

    /**
     * Get character title list.
     * @return {string}
     */
    getTitle() {
        // TODO refactor as title list.
        return this.title;
    }

    /**
     * Get character current state.
     * @return {Normal|*}
     */
    getState() {
        return this.state;
    }

    /**
     * Get character current exp.
     * @return {number}
     */
    getExp() {
        return this.status.exp;
    }

    /**
     * Get character next level exp.
     * @return {number}
     */
    getNextExp() {
        return this.status.next_exp;
    }

    /**
     * Get value of after cost HP.
     * @param value
     * @return {number}
     */
    afterCostHP(value) {
        return this.status.hp - value.hp;
    }

    /**
     * Get value of after cost MP.
     * @param value
     * @return {number}
     */
    afterCostMP(value) {
        return this.status.mp - value.mp;
    }

    /**
     * Get value of after cost SP.
     * @param value
     * @return {number}
     */
    afterCostSP(value) {
        return this.status.sp - value.sp;
    }

    /**
     * Cost HP.
     * @param value
     */
    costHP(value) {
        this.status.hp = this.afterCostHP(value);
    }

    /**
     * Cost MP.
     * @param value
     */
    costMP(value) {
        this.status.mp = this.afterCostMP(value);
    }

    /**
     * Cost SP.
     * @param value
     */
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
        const sp = this.status.max_sp += 0;
        const newStatus = Object.assign(this.status,{
            hp: hp,
            max_hp: hp,
            mp: mp,
            max_mp: mp,
            sp: sp,
            max_sp: sp,
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

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return this.status.str;
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return this.status.vit;
    }

    /**
     * Getter for dex
     * @return {number}
     */
    get dex() {
        return this.status.dex;
    }

    /**
     * Getter for agi
     * @return {number}
     */
    get agi() {
        return this.status.agi;
    }

    /**
     * Getter for int
     * @return {number}
     */
    get int() {
        return this.status.int;
    }

    /**
     * Getter for luk
     * @return {number}
     */
    get luk() {
        return this.status.luk;
    }

    /**
     * Getter for HP
     * @return {number}
     */
    get currentHP() {
        return this.status.hp;
    }

    /**
     * Getter for MP
     * @return {number}
     */
    get currentMP() {
        return this.status.mp;
    }

    /**
     * Getter for SP
     * @return {number}
     */
    get currentSP() {
        return this.status.sp;
    }

    /**
     * Getter for max HP
     * @return {number}
     */
    get maxHP() {
        return this.status.max_hp;
    }

    /**
     * Getter for max MP
     * @return {number}
     */
    get maxMP() {
        return this.status.max_mp;
    }

    /**
     * Getter for max SP
     * @return {number}
     */
    get maxSP () {
        return this.status.max_sp;
    }

    /**
     * Setter for str
     * @param argv
     */
    set str(argv) {
        this.status.str = argv;
    }

    /**
     * Setter for vit
     * @param argv
     */
    set vit(argv) {
        this.status.vit = argv;
    }

    /**
     * Setter for dex
     * @param argv
     */
    set dex(argv) {
        this.status.dex = argv;
    }

    /**
     * Setter for agi
     * @param argv
     */
    set agi(argv) {
        this.status.agi = argv;
    }

    /**
     * Setter for int
     * @param argv
     */
    set int(argv) {
        this.status.int = argv;
    }

    /**
     * Setter for luk
     * @param argv
     */
    set luk(argv) {
        this.status.luk = argv;
    }

    /**
     * Setter for HP
     * @param argv
     */
    set currentHP(argv) {
        this.status.hp = argv;
    }

    /**
     * Setter for MP
     * @param argv
     */
    set currentMP(argv) {
        this.status.mp = argv;
    }

    /**
     * Setter for SP
     * @param argv
     */
    set currentSP(argv) {
        this.status.sp = argv;
    }

    /**
     * Setter for max HP
     * @param argv
     */
    set maxHP(argv) {
        this.status.max_hp = argv;
    }

    /**
     * Setter for max MP
     * @param argv
     */
    set maxMP(argv) {
        this.status.max_mp = argv;
    }

    /**
     * Setter for max SP
     * @param argv
     */
    set maxSP (argv) {
        this.status.max_sp = argv;
    }
}

module.exports = Character;