const Action = require('./action');

/**
 * Attack action.
 */
class Join extends Action
{
    /**
     * Constructor
     * @param context
     */
    constructor(context) {
        super(context);
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
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
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
}

module.exports = Join;