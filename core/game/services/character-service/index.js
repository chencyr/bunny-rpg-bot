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
        const condition = { user_id: data.userId };

        if (! await this.characterModel().exist(condition)) {
            const player = new Player(data);
            const newRecord = Object.assign({}, condition);
            newRecord.name = data.name;

            await this.characterModel().insert(newRecord);
        }

        const records = await this.characterModel().getRecord(condition);



        // if (this.context.$object.character[data.userId]) {
        //     throw new Error('User already created character error.');
        // }
        //
        // const character = new Player(data);
        // this.context.$object.character[data.userId] = character;
        // return {
        //     isSuccess: true,
        //     characterName: data.name,
        // };
    }
}


module.exports = CharacterService;
