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
        if (!this.action) {
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

            this.action = { name: name, args: parts };
        }

        return this.action;
    }

    /**
     * Get actor from data.
     *
     * @return {object}
     */
    async getActionFrom() {
        if (this.getAction().name == 'join') {
            const source = this.context.event.source;
            const model = this.context.gameEngine.createModel('users');

            const user = { line_id: source.userId, name: 'New Player' };
            const records = await model.forceRecord(user);
            if (! records.length > 0) {
                throw new Error('Create new user failed');
            }

            const fromObj = { userId: records[0].id };
            console.info(`Event: action-from object:`, fromObj);

            return fromObj;
        }
        else {
            const source = this.context.event.source;
            const model = this.context.gameEngine.createModel('users');

            const user = { line_id: source.userId };
            const records = await model.characters().where(user).limit(1).offset(0);

            if (! records.length > 0) {
                throw new Error('Action from user not joined error');
            }

            const fromObj = { characterId: records[0].id };
            console.info(`Event: action-from object:`, fromObj);

            return fromObj;
        }
    }

    /**
     * Get action to data
     *
     * @return {array|object}
     */
    async getActionTo() {
        if (this.getAction().name == 'invite') {
            const mention = this.context.event.message.mention;
            const toObj = [];

            if (mention) {
                const model = this.context.gameEngine.createModel('users');

                for(let index in mention.mentionees) {
                    const item = mention.mentionees[index];
                    const user = { line_id: item.userId, name: 'New Player' };
                    const records = await model.forceRecord(user);

                    toObj.push({ userId: records[0].id });
                }
            }
            console.info(`Event: action-to object:`, toObj);

            return toObj;
        }
        else {
            const mention = this.context.event.message.mention;
            const toObj = [];

            if (mention) {
                const model = this.context.gameEngine.createModel('users');
                for(let index in mention.mentionees) {
                    const item = mention.mentionees[index];
                    const user = { line_id: item.userId };
                    const records = await model.characters().where(user).limit(1).offset(0);
                    model.resetQueryBuilder();

                    if (! records.length > 0) {
                        throw new Error('Action to user not joined error');
                    }

                    toObj.push({ characterId: records[0].id });
                }
            }

            console.info(`Event: action-to object:`, toObj);
            return toObj;
        }
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
                notReply: () => false,
                getMessages: () => result.messages,
            };
        }
        catch (e) {
            console.error('Event:', e);
            const returnMessages = {
                type: 'text', text: `不要亂搞!! 你看噴錯誤了啦!!\n${e}`
            };
            return {
                notReply: () => false,
                getMessages: () => [returnMessages],
            };
        }
    }

}

module.exports = LineCommandEventAdapter;