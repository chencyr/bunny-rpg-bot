const Factory = require('./event-factory');
const Adapter = require('./line-command-event-adapter');

/**
 * Line event factory
 */
class LineEventFactory extends Factory {

    /**
     * Create command event instance by adapter.
     * @param event
     */
    createBotCmdAdapter(event) {
        return new Adapter({event: event});
    }
}

module.exports = LineEventFactory;