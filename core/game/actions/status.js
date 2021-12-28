const Action = require('./action');

/**
 * State action.
 */
class Status extends Action
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
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        const characterService = this.context.getService('character-service');
        const player = await characterService.getById(from.characterId);

        if (! player) {
            this.writeMsg(`抓到了吼～你還沒加入！\n輸入 /join {角色名稱} 加入這個美好相殘的故事八`);
            return this;
        }
        const status = player.getStatus();

        let text = `名稱: ${player.getName()}   等級: ${player.getLevel()}   職業: ${player.getJob()}\n`;
        text += `狀態:${player.getState()}   稱號: ${player.getTitle()}\n`;
        text += `經驗值: ${player.getExp()}/${player.getNextExp()}\n`;
        text += `HP: ${status.hp}/${status.max_hp}    MP: ${status.mp}/${status.max_mp} SP: ${status.sp}/${status.max_sp}\n`;
        text += `STR: ${status.str}    VIT: ${status.vit}\n`;
        text += `DEX: ${status.dex}    AGI: ${status.agi}\n`;
        text += `INT: ${status.int}    LUK: ${status.luk}\n`;

        this.writeMsg(text);
    }
}

module.exports = Status;