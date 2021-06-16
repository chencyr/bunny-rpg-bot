

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
            const characterService = this.context.getService('character-service');

            if (to.length == 0) {
                if (! args[0]) {
                    throw new Error('Cannot find character error');
                }
                to.characterId = args[0];  
            }

            const character1 = await characterService.getById(from.characterId);
            const character2 = await characterService.getById(to.characterId);

            if (!character1 || !character2) {
                throw new Error('Cannot find character error');
            }

            const damage = character1.createDamage();
            const result = character2.receiveDamage(damage);

            this.messages = [];

            if (result.isMiss == true) {
                this.messages.push({
                    type: 'text',
                    text: `${character1.getName()} 攻擊了 ${character2.getName()}，但技巧很差被 ${character2.getName()} 閃過了!!`
                });
                return this;
            }

            this.messages.push({
                type: 'text',
                text: `${character1.getName()} 攻擊了 ${character2.getName()}，${character2.getName()} 受到 -${result.damageHp} HP 損傷!! 剩下 ????? HP!!`
            });

            if (result.hp == 0) {
                this.messages.push({
                    type: 'text',
                    text: `${character2.getName()} 已死亡倒在地上抖動!!`
                });
            }

            if (result.exp > 0) {
                const isLevelUp = character1.receivedExp(result.exp);
                let expText = `${character1.getName()} 獲得經驗值 ${result.exp} exp!!`;
                if(isLevelUp) {
                    expText += ` 你的等級提升了!! LV.${character1.getLevel()}`;
                }
                this.messages.push({
                    type: 'text',
                    text: expText
                });
            }
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