

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
    async exec(from, to, args) {
        this.isActorCanAction(from);
        this.isActionCanTo(to);

        try {
            const characterService = this.context.getService('character-service');
            const player = await characterService.getById(from.characterId);

            if (!player) {
                this.messages = {type: 'text', text: `抓到了吼～你還沒加入！\n輸入 /join {角色名稱} 加入這個美好相殘的故事八`};
                return this;
            }
            const status = player.getStatus();

            let text = `名稱: ${player.getName()}   等級: ${player.getLevel()}   職業: ${player.getJob()}\n`;
            text += `狀態:${player.getState()}   稱號: ${player.getTitle()}\n`;
            text += `經驗值: ${player.getExp()}\n`;
            text += `HP: ${status.hp}/${status.max_hp}    MP: ${status.mp}/${status.max_mp}\n`;
            text += `STR: ${status.str}    VIT: ${status.vit}\n`;
            text += `DEX: ${status.dex}    AGI: ${status.agi}\n`;
            text += `INT: ${status.int}    LUK: ${status.luk}\n`;

            // const text = 'developing';
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