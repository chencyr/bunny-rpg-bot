const Player = require('./character/player/player');

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
        const condition = { user_id: data.userId };
        const player = new Player({ name: data.name, user_id: data.userId }, this.characterModel);

        if (! await this.characterModel().exist(condition)) {
            await player.storeStatus();

            const records = await this.characterModel().getRecord(condition);
            player.setStatus(records[0]);

            const objType = 'character';
            const objectId = player.getStatus().id;
            this.context.setObject(objType, player, objectId);

            return null;
        }

        throw new Error('User already created character error.');
    }
}


module.exports = CharacterService;
