

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
        this.messages = [];
        this.messageTemp = "";
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
     * Write info image. this is used to handler stage.
     * @param url
     */
    writeImg(url) {
        const host = this.context.getImageHost();
        this.messages.push({
            type: 'image', text: this.messageTemp,
            originalContentUrl: `https://${host}/statics/skill-explosion.png`,
            previewImageUrl: `https://${host}/statics/skill-explosion.png`,
            animated: true
        });
    }

    /**
     * Write info message. this is used to handler stage.
     * @param message
     */
    writeMsg(message) {
        this.messageTemp += "" + message + "\n";
        return this;
    }

    /**
     * Output info message. this is used to handler stage.
     */
    sendMsg() {
        this.messages.push({type: 'text', text: this.messageTemp});
        this.messageTemp = "";
        return this;
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
            this.writeMsg(`不要亂搞!! 你看噴錯誤了啦!!\n${e}`);
        }

        return this;
    }

    /**
     * Get process messages.
     * @return {{}|*}
     */
    getMessages() {
        this.sendMsg();
        return this.messages;
    }

}

module.exports = Action;