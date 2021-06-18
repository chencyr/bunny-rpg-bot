

/**
 * ReceiverGetter base class.
 */
class ReceiverGetter
{
    /**
     * Get received game object for this action.
     * @param to
     * @param args
     * @return {Promise<Array>}
     */
    async getReceivedObjects(to, args) {
        throw new Error('Not implement error.');
    }
}

module.exports = ReceiverGetter;