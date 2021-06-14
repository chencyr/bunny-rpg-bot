

/**
 * Revive action.
 */
class Revive
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
        return "revive";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "revive",
            "復活",
            "爬起來",
            "別死啊",
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

        try {
            const type = 'character';
            if (!this.context.hasObject(type, from)) {
                this.messages = {type: 'text', text: `你還沒加入不能復活別人啦!!`};
                return this;
            }
            const fromObj = this.context.getObject(type, from);

            if (!this.context.hasObject(type, to)) {
                this.messages = {type: 'text', text: `你復活的對象還沒加入不能打啦!!`};
                return this;
            }
            const toObj = this.context.getObject(type, to);


            this.messages = [];
            if (toObj.status.hp > 0) {
                this.messages.push({
                    type: 'text',
                    text: `${fromObj.getName()} 大大，${toObj.getName()} 人都還沒屎，是在哈囉?`
                });
                return this;
            }

            toObj.status.hp = 0 + toObj.maxHp;
            this.messages.push({
                type: 'text',
                text: `${fromObj.getName()} 復活了 ${toObj.getName()}，${toObj.getName()} 現在又是一條好漢!!`
            });

            return this;
        }
        catch (e) {
            console.info("GameEngine: join action:", e);
            this.messages = {type: 'text', text: `邀請失敗!! 不要亂搞!! \n你看錯誤發生了\n${e}`};
        }

        return this;
    }

    getMessages() {
        return this.messages;
    }

}

module.exports = Revive;