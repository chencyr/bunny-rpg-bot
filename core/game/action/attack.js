
const Factory = require('./event-factory');

/**
 * Line event factory
 */
class LineEventFactory extends Factory {

    /**
     * Create command event instance by adapter.
     * @param event
     */
    createBotCmdAdapter(event) {
        throw new Error('Not implement method.');
    }
}

module.exports = LineEventFactory;