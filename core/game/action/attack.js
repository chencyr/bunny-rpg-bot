

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
        return "attack";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "attack",
            "攻擊",
            "打",
            "Attack",
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
     * Get random number.
     * @param min
     * @param max
     * @return {*}
     */
    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };

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
                this.messages = {type: 'text', text: `你還沒加入不能打別人啦!!`};
                return this;
            }
            const fromObj = this.context.getObject(type, from);

            if (!this.context.hasObject(type, to)) {
                this.messages = {type: 'text', text: `你攻擊的對象還沒加入不能打啦!!`};
                return this;
            }
            const toObj = this.context.getObject(type, to);

            const damage = fromObj.createDamage();
            const result = toObj.receiveDamage(damage);

            this.messages = [];

            if (result.isMiss == true) {
                this.messages.push({
                    type: 'text',
                    text: `${fromObj.getName()} 攻擊了 ${toObj.getName()}，但技巧很差被 ${toObj.getName()} 閃過了!!`
                });
                return this;
            }

            this.messages.push({
                type: 'text',
                text: `${fromObj.getName()} 攻擊了 ${toObj.getName()}，${toObj.getName()} 受到 -${result.damageHp} HP 損傷!! 剩下 ????? HP!!`
            });

            if (result.hp == 0) {
                this.messages.push({
                    type: 'text',
                    text: `${toObj.getName()} 已死亡倒在地上抖動!!`
                });
            }

            if (result.exp > 0) {
                const isLevelUp = fromObj.receivedExp(result.exp);
                let expText = `${fromObj.getName()} 獲得經驗值 ${result.exp} exp!!`;
                if(isLevelUp) {
                    expText += ` 你的等級提升了!! LV.${fromObj.getLevel()}`;
                }
                this.messages.push({
                    type: 'text',
                    text: expText
                });
            }
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

module.exports = Attack;