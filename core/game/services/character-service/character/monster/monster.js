const Character = require('../character');

const randomFromArray = require('../../../../helpers/randomFromArray');

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
        super(initInfo, context);

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
        this.status.user_type = 'monster';
        this.status.template = 'monster';
    }

    /**
     * Clone self as new instance and use new object ID.
     * @return {Monster}
     */
    clone() {
        const type = this.status.user_type;
        const template = this.status.template;
        const instance = this.context.createInstance(type, template);

        instance.setStatus(Object.assign({}, this.status));
        instance.setSkills(Object.assign({}, this.skills));
        instance.setBuffs(this.buffs.concat());
        instance.status.id = this.generateID();

        return instance;
    }

    addLevels(level) {
        for(let i = 0; i < level; i++) {
            this.levelUp();
        }
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

    /**
     * Behavior after damage.
     * @param damage {Object}
     * @return {Promise<void>}
     */
    async afterReceivedDamage(damage) {
        const game = this.context.context;
        const auto = randomFromArray(this.autoActions());
        const action = game.createAction(auto.name);

        const result = await action.exec({characterId: this.status.id}, [damage.from.getId()], [damage.from.getId()]);
        const messages = result.getMessages();

        damage.action.appendMessages(messages);
    }

    /**
     * Generate character ID.
     * @return {string}
     */
    generateID() {
        const random = this.getRandom(1000, 9999); // TODO limit 1000 item in game engine
        const id = `${this.status.template}_${random}`;

        console.info("Action: Generate monster ", id);
        return id;

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

module.exports = Monster;