

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
    exec(from, to, args) {

        this.isObjectCanAction(from);
        this.isActionCanToObject(to);

        const type = 'character';
        if (this.context.hasObject(type, from)) {
            this.messages = {type: 'text', text: `ㄟㄟ!! 你還沒加入不能邀請別人啦!!`};
        }
        const fromObj = this.context.getObject(type, from);

        if (this.context.hasObject(type, to)) {
            const toObj = this.context.getObject(type, to);
            this.messages = {type: 'text', text: `${toObj.getName()}早就加入拉!! ${fromObj.getName()}你失憶了喔?!`};
        }

        const result = this.context.newCharacter({
            userId: to.userId,
            name: args[0]
        });

        const name = result.characterName;
        this.messages = {type: 'text', text: `${name}, 恭喜您!! 成功被 [${fromObj.getName()}] 加入這個糞Game!!`};

        return this;
    }

    getMessages() {
        return this.messages;
    }

}

module.exports = Attack;