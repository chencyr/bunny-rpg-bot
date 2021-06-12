const Adapter = require('../command/bot-command-event-adapter');

/**
 * LineCommandEventAdapter base class
 */
class LineCommandEventAdapter extends Adapter
{
    /**
     * Context data
     * @param context
     */
    constructor(context) {
        super(context);
    }

}

module.exports = LineCommandEventAdapter;