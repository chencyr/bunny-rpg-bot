
/**
 * EventFactory base class
 */
class EventFactory {

    /**
     * Create command event instance by adapter.
     * @param event
     */
    createBotCmdAdapter(event) {
        throw new Error('Not implement method.');
    }
}

module.exports = EventFactory;