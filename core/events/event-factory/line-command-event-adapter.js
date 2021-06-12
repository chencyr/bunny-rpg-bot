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

    /**
     * Get action data.
     *
     * @return {object} Action info object {name: <string>, args: [<string>, <string>, ...]}
     */
    getAction() {
        let text = this.context.event.message.text;

        const regex = /(^\/[\u4e00-\u9fa5_a-zA-Z0-9\-]+( )*)([\u4e00-\u9fa5_a-zA-Z0-9\-]( )*)*/g;
        const match = text.match(regex);

        if (match == null || match == undefined || match == []) {
            throw new Error('Invalid command format error');
        }

        text = match[0];
        if (text.substring(0, 1) == '/') {
            text = text.slice(1);
        }

        const end = text.length - 1
        if (text.substring(end) == ' ') {
            text = text.slice(0, end);
        }

        text = text.replace(/( )+/gi, ' ');
        let parts = text.split(' ');

        const name = parts.shift();
        return {
            name: name,
            args: parts,
        };
    }

    getActor() {
        const source = this.context.event.source;
        // LINE user ID
        // source.userId
        // source.type (should be 'user')
    }

    getActionTo() {
        const mention = this.context.event.message.mention;
        if (mention) {
            // LINE user ID
            // mention.mentionees[index].userId
        }
    }

    getGameEngine() {
        throw new Error('Not implement method.');
    }

    /**
     * Trigger this event automatically
     * @return {*}
     */
    trigger() {
        const result = super.trigger();

        return {
            hasException: () => false,
            getMessages: () => {
                return {
                    type: 'text',
                    text: `Leo HP最大值:10 目前HP:10 每秒恢復:10`,
                }
            },
        };
    }

}

module.exports = LineCommandEventAdapter;