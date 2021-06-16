const Action = require('./action');

/**
 * Summon action.
 */
class Summon extends Action
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
        return "summon";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "summon",
            "召喚",
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
        if (!player) {
            this.writeMsg(`抓到了吼～你還沒加入！\n輸入 /join {角色名稱} 加入這個美好相殘的故事八`);
            return this;
        }

        const monster = await characterService.new('monster', {});

        this.writeMsg(`${player.getName()} 成功召喚了一隻極為兇猛的怪物 !!`)
            .writeMsg(`其偉大的名字為...「${monster.getName()}」!!!`)
            .writeMsg("")
            .writeMsg(`${monster.getStatus().id}`)
    }
}

module.exports = Summon;