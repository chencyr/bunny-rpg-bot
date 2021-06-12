
/**
 * EventFactory base class
 */
class EventFactory {

    /**
     * Create command event instance by adapter.
     * @param event {object} event object
     * @param options {object} Optional args
     */
    createBotCmdAdapter(event, options) {
        throw new Error('Not implement method.');
    }
}

module.exports = EventFactory;