const Player = require('./character/player/player');
const Monster = require('./character/monster/monster');
const NormalState = require('./character/state/normal');
const DeadState = require('./character/state/dead');

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
    }

    /**
     * Create character model instance.
     * @return {Users}
     */
    characterModel() {
        return this.context.createModel('characters');
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
            const player = new Player({ name: data.name, user_id: data.userId }, this);
            const model = this.characterModel();

            if (! await model.exist(condition)) {
                await player.storeStatus();

                const records = await model.getRecord(condition);
                player.setStatus(records[0]);

                const objType = 'character';
                const objectId = player.getStatus().id;
                this.context.setObject(objType, player, objectId);

                return player;
            }

            throw new Error('User already created character error.');
        }

        if (type == 'monster') {
            const monster = new Monster({ name: "初級怪物", user_id: "SYSTEM" }, this);
            const objType = 'character';
            const objectId = monster.getStatus().id;
            this.context.setObject(objType, monster, objectId);

            return monster;
        }


        throw new Error('Create new character failed.');
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
            const player = new Player({}, this);
            player.setStatus(records[0]);
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
