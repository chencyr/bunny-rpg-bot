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
    async getActor() {
        const source = this.context.event.source;
        const condition = { line_id: source.userId };

        const user = Object.assign({ name: 'New Player' }, condition);
        const model = this.context.gameEngine.createModel('users');
        const records = await model.forceRecord(user);

        return { userId: records[0].id };
    }

    /**
     * Get action to data
     *
     * @return {Array}
     */
    async getActionTo() {
        const mention = this.context.event.message.mention;

        if (mention) {
            const model = this.context.model;
            const name = 'users';

            const toObj = mention.mentionees.reduce(async (result, item) => {
                const condition = { line_id: item.userId };

                if (! await model(name).exist(condition)) {
                    const newUser = Object.assign({ name: 'NewPlayer' }, condition);
                    model(name).insert(newUser);
                }

                const record = await model(name).getRecord(condition)[0];
                console.debug('record', record);
                result.push({ userId: record.id });

                return result;
            }, []);
            console.info(`Event: action-to object:`, toObj);

            return toObj;
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
    async trigger() {
        try {
            const result = await super.trigger();
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