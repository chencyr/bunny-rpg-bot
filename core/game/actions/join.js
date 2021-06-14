

/**
 * Attack action.
 */
class Attack
{
    /**
     * Constructor
     * @param context
     */
    constructor(context) {
        this.context = context;
    }

    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "join";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "join",
            "加入",
        ];
    }


    /**
     * Check object can do the action.
     * @param object
     * @return {boolean}
     */
    isObjectCanAction(object) {
        return true;
    }

    /**
     * Check action to the object.
     * @param object
     */
    isActionCanToObject(object) {
        return true;
    }

    /**
     * Execute action.
     * @param from
     * @param to
     * @param args
     * @return this
     */
    async exec(from, to, args) {
        this.isObjectCanAction(from);
        this.isActionCanToObject(to);

        try {
            if (!args[0]) {
                this.messages = {type: 'text', text: `請輸入您的角色名稱`};
            }

            const result = await this.context.newCharacter({
                userType: 'line',
                userId: from.userId,
                name: args[0]
            });

            const name = result.characterName;
            this.messages = {type: 'text', text: `${name}, 恭喜您成功加入這個糞Game!!`};

            return this;
        }
        catch (e) {
            console.info("GameEngine: join action:", e);
            this.messages = {type: 'text', text: `${args[0]}, 創建角色失敗!! 不要亂搞!! \n你看錯誤發生了\n${e}`};
        }

        return this;
    }

    getMessages() {
        return this.messages;
    }

}

module.exports = Attack;