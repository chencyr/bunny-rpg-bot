const Action = require('./action');
const board = require('./utils/output-status-board')

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

        this.writeMsg(board(player));
    }
}

module.exports = Status;