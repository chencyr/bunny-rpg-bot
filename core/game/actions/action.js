

/**
 * Action base class.
 */
class Action
{
    /**
     * Constructor
     * @param context {Engine}
     */
    constructor(context) {
        this.context = context;
        this.messages = {};
    }


    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "action";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "action",
        ];
    }

    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        throw new Error('Not implement error');
    }

    /**
     * Execute action for user calling
     * @param from
     * @param to
     * @param args
     * @return this
     */
    async exec(from, to, args) {
        try {
            await this.handler(from, to, args);
        }
        catch (e) {
            console.error("GameEngine: action:", e);
            this.messages = {type: 'text', text: `不要亂搞!! 你看噴錯誤了啦!!\n${e}`};
        }

        return this;
    }

    /**
     * Get process messages.
     * @return {{}|*}
     */
    getMessages() {
        return this.messages;
    }

}

module.exports = Action;