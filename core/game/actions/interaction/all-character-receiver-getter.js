const Getter = require('./receiver-getter');

/**
 * AllCharacterReceiverGetter class.
 */
class AllCharacterReceiverGetter extends Getter
{
    /**
     * Get received game object for this action.
     * @param to
     * @param args
     * @return {Promise<Array>}
     */
    async getReceivedObjects(to, args) {
        const characterService = this.context.getService('character-service');
        let ids = to
            .reduce((carry, item) => carry.concat([item.characterId]), [])
            .filter((item) => item === undefined)
            .concat(args);

        ids = AllCharacterReceiverGetter.filterDuplicate(ids);
        return await characterService.getByIds(ids);
    }

    /**
     * Remove duplicate value in array.
     * @param arr {array}
     * @return {array}
     */
    static filterDuplicate (arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }
}

module.exports = AllCharacterReceiverGetter;