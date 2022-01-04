const NormalState = require('./state/normal');
const DeadState = require('./state/dead');
const KnockedOutState = require('./state/knocked-out');

/**
 * Character base class
 *
 */
class Character
{
    /**
     * Init player
     * @param initInfo
     * @param context {CharacterService}
     * @constructor
     */
    constructor(initInfo, context) {
        this.context = context;
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
            image: null,
            slogan: null,
            coin: 0,
        };

        this.revive_timer = 0; // sec
        this.revive_limit = 300; // sec

        this.job = "無職業";
        this.title = "無稱號";
        this.state = Character.createState(NormalState.name(), this);

        this.buffs = [];
        this.skills = {};
    }

    /**
     * Get character image.
     * @return {string|null}
     */
    getImage() {
        return this.status.image;
    }

    /**
     * Get character slogan
     * @return {null}
     */
    getSlogan() {
        return this.status.slogan;
    }

    /**
     * Set buff by prototype list.
     *
     * @param buffs {array|undefined} [StandardBuff Class, StandardBuff Class, ...]
     */
    setBuffsByPrototype(buffs) {
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
     * Set buffs by instance list.
     * @param buffs
     * @return {this}
     */
    setBuffs(buffs) {
        this.buffs = buffs;
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

        return Math.floor(exp);
    }

    /**
     * Convert the object to coin
     * @return {number}
     */
    toCoin() {
        return 0;
    }

    /**
     * Received coin from other object.
     * @param $params
     */
    receivedCoin($params) {
        this.status.coin = $params.coin;
    }

    /**
     * Send coin to other object
     * @param coin
     */
    sendCoin(coin) {
        if(this.status.coin - coin >= 0) {
            this.status.coin -= coin;
            return {coin: coin};
        }

        throw new Error("金幣不足");
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
     * Get skill list
     * @return {array} [Skill, Skill ...]
     */
    getSkills() {
        return this.skills;
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
        KnockedOut: KnockedOutState,
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
     * Get character ID
     * @return {*}
     */
    getId() {
        return this.status.id;
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
        return Math.floor(this.status.exp);
    }

    /**
     * Get character next level exp.
     * @return {number}
     */
    getNextExp() {
        return Math.floor(this.status.next_exp);
    }

    /**
     * Get value of after cost HP.
     * @param value
     * @return {number}
     */
    afterCostHP(value) {
        return this.currentHP - value.hp;
    }

    /**
     * Get value of after cost MP.
     * @param value
     * @return {number}
     */
    afterCostMP(value) {
        return this.currentMP - value.mp;
    }

    /**
     * Get value of after cost SP.
     * @param value
     * @return {number}
     */
    afterCostSP(value) {
        return this.currentSP - value.sp;
    }

    /**
     * Cost HP.
     * @param value
     */
    costHP(value) {
        this.currentHP = this.afterCostHP(value);
    }

    /**
     * Cost MP.
     * @param value
     */
    costMP(value) {
        this.currentMP = this.afterCostMP(value);
    }

    /**
     * Cost SP.
     * @param value
     */
    costSP(value) {
        this.currentSP = this.afterCostSP(value);
    }

    /**
     * Change state to new state
     * @param name
     */
    changeState(name) {
        const newState = Character.createState(name, this);
        if(this.state.canChange(newState)) {
            this.state.down();
            this.state = newState;
            this.state.up();
        }
        else {
            throw new Error(`Cannot change state from ${this.state} to ${newState}.`);
        }

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
    async receiveDamage(damage) {
        const result = this.state.receiveDamage(damage);
        await this.afterReceivedDamage(damage);
        return result;
    }

    /**
     * Behavior after damage.
     * @param damage {Object}
     * @return {Promise<void>}
     */
    async afterReceivedDamage(damage) {
        // not thing to do
    }

    /**
     * Check the character is can create damage.
     *
     * @param skill
     * @param receivers
     * @param action
     * @param args
     */
    verifyCreateDamage(skill, receivers, action, args) {
        return this.state.verifyCreateDamage(skill, this, receivers, action, args);
    }

    /**
     * Check the character is can receive damage.
     *
     * @param skill
     * @param senders
     * @param action
     * @param args
     */
    verifyReceivedDamage(skill, senders, action, args) {
        return this.state.verifyReceivedDamage(skill, senders, this, action, args);
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
        return this.fib(this.getLevel());
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
     * Getter for adjust str
     * @return {number}
     */
    get adjustSTR() {
        return this.buffs.reduce((previous, buff) => previous + buff.str, 0);
    }

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return this.status.str + this.adjustSTR;
    }

    /**
     * Getter for adjust vit
     * @return {number}
     */
    get adjustVIT() {
        return this.buffs.reduce((previous, buff) => previous + buff.vit, 0);
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return this.status.vit + this.adjustVIT;
    }

    /**
     * Getter for adjust dex
     * @return {number}
     */
    get adjustDEX() {
        return this.buffs.reduce((previous, buff) => previous + buff.dex, 0);
    }

    /**
     * Getter for dex
     * @return {number}
     */
    get dex() {
        return this.status.dex + this.adjustDEX;
    }

    /**
     * Getter for adjust agi
     * @return {number}
     */
    get adjustAGI() {
        return this.buffs.reduce((previous, buff) => previous + buff.agi, 0);
    }

    /**
     * Getter for agi
     * @return {number}
     */
    get agi() {
        return this.status.agi + this.adjustAGI;
    }

    /**
     * Getter for adjust int
     * @return {number}
     */
    get adjustINT() {
        return this.buffs.reduce((previous, buff) => previous + buff.int, 0);
    }

    /**
     * Getter for int
     * @return {number}
     */
    get int() {
        return this.status.int + this.adjustINT;
    }

    /**
     * Getter for adjust luk
     * @return {number}
     */
    get adjustLUK() {
        return this.buffs.reduce((previous, buff) => previous + buff.luk, 0);
    }

    /**
     * Getter for luk
     * @return {number}
     */
    get luk() {
        return this.status.luk + this.adjustLUK;
    }

    /**
     * Get allow access status properties list.
     * @return {Array}
     */
    allowAccessStatus() {
        return ['str', 'vit', 'dex', 'agi', 'int', 'luk'];
    }

    /**
     * Get status property value.
     * @param name {string}
     * @return {mixed}
     */
    statusProperty(name) {
        if(this.allowAccessStatus().includes(name)) {
            return this.status[name];
        }

        throw new Error(`Cannot access not allow status property [${name}] error`);
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

    get coin() {
        return this.status.coin;
    }

    set coin (argv) {
        this.status.coin = argv;
    }
}

module.exports = Character;