

/**
 * State action.
 */
class Status
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
        return "status";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "status",
            "狀態",
        ];
    }

    /**
     * Check actor can do the action.
     * @param actor
     * @return {boolean}
     */
    isActorCanAction(actor) {
        return true;
    }

    /**
     * Check action to the object.
     * @param object
     */
    isActionCanTo(object) {
        return true;
    }

    /**
     * Execute action.
     * @param from
     * @param to
     * @param args
     */
    exec(from, to, args) {
        this.isActorCanAction(from);
        this.isActionCanTo(to);

        try {
            const type = 'character';
            if (!this.context.hasObject(type, from)) {
                this.messages = {type: 'text', text: `抓到了吼～你還沒加入！\n輸入 /join {角色名稱} 加入這個美好相殘的故事八`};
                return this;
            }
            const fromObj = this.context.getObject(type, from);
            const status = fromObj.getStatus();

            let text = `名稱: ${fromObj.getName()}   等級: ${fromObj.getLevel()}   職業: ${fromObj.getJob()}\n`;
            text += `狀態:${fromObj.getState()}   稱號: ${fromObj.getTitle()}\n`;
            text += `經驗值: ${fromObj.getExp()}\n`;
            text += `HP: ${status.hp}/${status.maxHp}    MP: ${status.mp}/${status.maxMp}\n`;
            text += `STR: ${status.str}    VIT: ${status.vit}\n`;
            text += `DEX: ${status.dex}    AGI: ${status.agi}\n`;
            text += `INT: ${status.int}    LUK: ${status.luk}\n`;

            this.messages = {type: 'text', text: text};
        }
        catch (e) {
            console.info("GameEngine: status action:", e);
            this.messages = {type: 'text', text: `讀取狀態失敗!! 不要亂搞!! \n你看錯誤發生了\n${e}`};
        }

        return this;
    }

    getMessages() {
        return this.messages;
    }

}

module.exports = Status;