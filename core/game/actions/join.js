

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

            const userService = this.context.getService('user-service');
            const characterService = this.context.getService('character-service');

            if (! await userService.has(from.userId)) {
                throw new Error('Invalid user error: user not found.');
            }

            const character = { userId: from.userId, name: args[0] };
            await characterService.new('player', character);

            const name = character.name;
            this.messages = {type: 'text', text: `${name}, 恭喜您成功加入這個糞Game!!`};
        }
        catch (e) {
            console.error("GameEngine: action:", e);
            this.messages = {type: 'text', text: `不要亂搞!! 你看噴錯誤了啦!!\n${e}`};
        }

        return this;
    }

    getMessages() {
        return this.messages;
    }

}

module.exports = Attack;