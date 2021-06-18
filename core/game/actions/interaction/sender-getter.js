

/**
 * SenderGetter base class.
 */
class SenderGetter
{
    /**
     * Get send game object for this action.
     * @param from
     * @param args
     * @return {Promise<void>}
     */
    async getSendObjects(from, args) {
        throw new Error('Not implement error.');
    }
}

module.exports = SenderGetter;