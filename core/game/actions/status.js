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

        let text = `名稱: ${player.getName()}   等級: ${player.getLevel()}   職業: ${player.getJob()}\n`;
        text += `狀態:${player.getState()}   稱號: ${player.getTitle()}\n`;
        text += `經驗值: ${player.getExp()}/${player.getNextExp()}\n`;
        text += `HP: ${player.currentHP}/${player.maxHP}\n`;
        text += `MP: ${player.currentMP}/${player.maxMP}\n`;
        text += `SP: ${player.currentSP}/${player.maxSP}\n`;
        text += `STR: ${player.str}    VIT: ${player.vit}\n`;
        text += `DEX: ${player.dex}    AGI: ${player.agi}\n`;
        text += `INT: ${player.int}    LUK: ${player.luk}\n`;

        this.writeMsg(text);
    }
}

module.exports = Status;