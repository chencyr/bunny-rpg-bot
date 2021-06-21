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
        let ids = to.map((item) => item.characterId)
                    .filter((item) => !(item === undefined))
                    .concat(args)

        const characters = await characterService.getByIds(ids);
        return  AllCharacterReceiverGetter.filterDuplicate(characters);
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