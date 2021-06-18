

/**
 * Interaction base class.
 */
class Interaction
{
    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        throw new Error('Not implement error.');
    }
}

module.exports = Interaction;