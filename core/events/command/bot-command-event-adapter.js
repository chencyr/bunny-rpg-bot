const CommandEvent = require('./index.js');

/**
 * BotCommandEventAdapter base class
 */
class BotCommandEventAdapter extends CommandEvent
{
    /**
     * Context data
     * @param context
     */
    constructor(context) {
        super();
        this.context = context;
    }
}

module.exports = BotCommandEventAdapter;