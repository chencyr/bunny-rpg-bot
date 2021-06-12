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

        if (!context.gameEngine) {
            throw new Error('Missing required args property [gameEngine] error.');
        }
    }

    /**
     * Get action data.
     *
     * @return {object} Action info object {name: <string>, args: [<string>, <string>, ...]}
     */
    getAction() {
        let text = this.context.event.message.text;

        const regex = /(^\/[\u4e00-\u9fa5_a-zA-Z0-9\-]+( )*)([\u4e00-\u9fa5_a-zA-Z0-9\-@]( )*)*/g;
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

    /**
     * Get actor data.
     *
     * @return {{userId: string}}
     */
    getActor() {
        const source = this.context.event.source;
        // LINE user ID
        // source.userId
        // source.type (should be 'user')
        if (source.type != 'user') {
            throw new Error('Invalid source type for get actor error.');
        }

        /** Fake use LINE user info */
        return {
            userId: source.userId,
        };
    }

    /**
     * Get action to data
     *
     * @return {Array}
     */
    getActionTo() {
        const mention = this.context.event.message.mention;
        if (mention) {
            // LINE user ID
            // mention.mentionees[index].userId

            /** Fake use LINE user info */
            return mention.mentionees.reduce((result, item) => {
                result.push(item.userId);
            }, []);
        }

        return [];
    }

    /**
     * Get game engine instance
     *
     * @return {GameEngine}
     */
    getGameEngine() {
        return this.context.gameEngine;
    }

    /**
     * Trigger this event automatically
     * @return {*}
     */
    trigger() {
        try {
            const result = super.trigger();
            return {
                hasException: () => false,
                getMessages: () => result.messages,
            };
        }
        catch (e) {
            console.error('Event:', e);
            return {
                hasException: () => true,
                getMessages: () => [],
            };
        }
    }

}

module.exports = LineCommandEventAdapter;