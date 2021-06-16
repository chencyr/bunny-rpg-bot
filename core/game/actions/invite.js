

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
        // TODO: Test after refactor
        this.isObjectCanAction(from);
        this.isActionCanToObject(to);

        try {
            const userService = this.context.getService('user-service');
            const characterService = this.context.getService('character-service');

            let counter = 0;
            let names = "";

            for(let item in to) {
                if (! await userService.has(item.userId)) {
                    throw new Error('Invalid user error: user not found.');
                }

                const character = { userId: item.userId, name: args[counter] };
                await characterService.new('player', character);
                names += `${character.name}, `;

                counter++;
            }

            this.messages = {type: 'text', text: `${names}恭喜您成功加入這個糞Game!!`};

            // const type = 'character';
            // if (!this.context.hasObject(type, from)) {
            //     this.messages = {type: 'text', text: `ㄟㄟ!! 你還沒加入不能邀請別人啦!!`};
            //     return this;
            // }
            // const fromObj = this.context.getObject(type, from);
            //
            // if (this.context.hasObject(type, to)) {
            //     const toObj = this.context.getObject(type, to);
            //     this.messages = {type: 'text', text: `${toObj.getName()}早就加入拉!! ${fromObj.getName()}你失憶了喔?!`};
            //     return this;
            // }
            //
            // const result = this.context.newCharacter({
            //     userId: to[0].userId,
            //     name: args[0]
            // });
            //
            // const name = result.characterName;
            // this.messages = {type: 'text', text: `${name}, 恭喜您!! 成功被 [${fromObj.getName()}] 加入這個糞Game!!`};

            return this;
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