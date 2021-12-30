const Player = require('./character/player/player');
const Monster = require('./character/monster/monster');

const NormalState = require('./character/state/normal');
const DeadState = require('./character/state/dead');

const AutoHpRegenBuff = require('./character/buff/auto-hp-regen-buff');
const AutoMpRegenBuff = require('./character/buff/auto-mp-regen-buff');
const AutoSpRegenBuff = require('./character/buff/auto-sp-regen-buff');

/**
 * Character service, service should run as singleton.
 */
class CharacterService
{
    /**
     * Constructor
     * @param context {GameEngine}
     */
    constructor(context) {
        this.context = context;
        this.initServiceModules();
    }

    /**
     * Init service modules
     */
    initServiceModules() {
        console.info(`CharacterService: initServiceModules: Init...`);

        this.$const = {};
        this.$const.buff = 'buff';
        this.loadBuff();

        console.info(`CharacterService: initServiceModules: Finished`);
    }

    /**
     *
     */
    loadBuff() {
        const name = this.$const.buff;
        const loader = this.context.createLoader("CharacterService");
        const modulePath = `services/character-service/character/${name}`;

        this.context.modulePoolLoader(name, modulePath, loader);

        return this;
    }

    /**
     * Create character model instance.
     * @return {Users}
     */
    characterModel() {
        return this.context.createModel('characters');
    }

    /**
     * Create Buff instance.
     * @param name
     *
     * @return {StandardBuff}
     */
    createBuff(name) {
        // TODO implement.
    }

    /**
     * Create new character
     *
     * @param type {string} Character type
     * @param data {object} Character data
     */
    async new(type, data) {
        // new is only support type=player
        if (type == 'player') {
            const condition = { user_id: data.userId };
            const buffs = [AutoHpRegenBuff, AutoMpRegenBuff, AutoSpRegenBuff];
            const player = new Player({ name: data.name, user_id: data.userId, buffs: buffs }, this);
            const model = this.characterModel();

            if (! await model.exist(condition)) {
                await player.storeStatus(false);

                const records = await model.getRecord(condition);
                player.setStatus(records[0]);

                const objType = 'character';
                const objectId = player.getId();
                this.context.setObject(objType, player, objectId);

                return player;
            }

            throw new Error('User already created character error.');
        }

        if (type == 'monster') {
            const buffs = [AutoHpRegenBuff, AutoMpRegenBuff, AutoSpRegenBuff];
            const monster = new Monster({ name: "中級怪物", user_id: "SYSTEM", level: 15, buffs: buffs }, this);
            const objType = 'character';
            const objectId = monster.getId();
            this.context.setObject(objType, monster, objectId);

            return monster;
        }


        throw new Error('Create new character failed.');
    }

    /**
     * Get character instances by id list array, and ignore id if character not exists.
     * @param ids
     * @return {Promise<Array>}
     */
    async getByIds(ids) {
        const characters = [];

        for(let index in ids) {
            const id = ids[index];
            const character = await this.getById(id);
            if (character) {
                characters.push(character);
            }
        }

        return characters;
    }

    /**
     * Get character instance, and return null if character not exists.
     * @param id
     * @return {Promise<*>}
     */
    async getById(id) {
        const objType = 'character';
        const model = this.characterModel();

        if (this.context.hasObject(objType, id)) {
            return this.context.getObject(objType, id);
        }

        const records = await model.getById(id);
        if (records.length > 0) {
            //TODO: should auto get character type
            //TODO: store buff list into database
            const buffs = [AutoHpRegenBuff, AutoMpRegenBuff, AutoSpRegenBuff]

            const player = new Player({buffs: buffs}, this);
            player.setStatus(records[0]);

            const skills = await model.resetQueryBuilder()
                .where({ 'characters.id': id })
                .skills();

            // TODO: implement with default list.
            skills.push({
                standard_name: 'str-attack',
                id: 75,
                display_name: '攻擊',
                level: 1,
                type: 'standard',
            });

            player.setSkills(skills);

            this.context.setObject(objType, player, id);

            return player;
        }

        return null;
    }

    /**
     * Get class
     * @return {Normal}
     * @constructor
     */
    get NormalState() {
        return NormalState;
    }

    /**
     * Get class
     * @return {Dead}
     * @constructor
     */
    get DeadState() {
        return DeadState;
    }
}


module.exports = CharacterService;
