const Factory = require('./event-factory');
const Adapter = require('./discord-command-event-adapter');

/**
 * Line event factory
 */
class DiscordEventFactory extends Factory {

    /**
     * Create command event instance by adapter.
     * @param event {object} event object
     * @param options {object} Optional args
     */
    createBotCmdAdapter(event, options) {
        const data = {
            event: event,
            gameEngine: options.gameEngine,
            app: options.app,
        };
        return new Adapter(data);
    }
}

module.exports = DiscordEventFactory;