const Factory = require('./event-factory');
const Adapter = require('./line-command-event-adapter');

/**
 * Line event factory
 */
class LineEventFactory extends Factory {

    /**
     * Create command event instance by adapter.
     * @param event {object} event object
     * @param options {object} Optional args
     */
    createBotCmdAdapter(event, options) {
        const data = {
            event: event,
            gameEngine: options.gameEngine,
        };
        return new Adapter(data);
    }
}

module.exports = LineEventFactory;