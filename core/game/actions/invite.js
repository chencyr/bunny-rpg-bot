const Action = require('./action');

/**
 * Invite action.
 */
class Invite extends Action
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
        return "invite";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "invite",
            "邀請",
        ];
    }

    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        this.writeMsg(`指令維修中`);
        return;

        const userService = this.context.getService('user-service');
        const characterService = this.context.getService('character-service');

        let counter = 0;
        let names = "";

        for(let index in to) {
            const item = to[index];
            if (! await userService.has(item.userId)) {
                throw new Error('Invalid user error: user not found.');
            }

            const character = { userId: item.userId, name: args[counter] };
            await characterService.new('player', character);
            names += `${character.name}, `;

            counter++;
        }

        this.writeMsg(`${names}恭喜您成功加入這個糞Game!!`);
    }
}

module.exports = Invite;