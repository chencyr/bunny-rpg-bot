const Getter = require('./sender-getter');

/**
 * SinglePlayerSenderGetter class.
 */
class SinglePlayerSenderGetter extends Getter
{
    /**
     * Get send game object for this action.
     * @param from
     * @param args
     * @return {Promise<void>}
     */
    async getSendObjects(from, args) {
        const characterService = this.context.getService('character-service');
        let ids = [from]
            .reduce((carry, item) => carry.concat([item.characterId]), [])
        return await characterService.getByIds(ids);
    }
}

module.exports = SinglePlayerSenderGetter;