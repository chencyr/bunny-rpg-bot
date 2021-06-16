

/**
 * Summon action.
 */
class Summon
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

            const monster = await characterService.new('monster', {});
            this.messages = [
                {type: 'text', text: `${player.getName()}, 成功召喚了一隻兇猛的怪物 !! ${monster.getStatus().id}`},
                {type: 'text', text: `其偉大的名字為...「${monster.getName()}」!!!`},
            ];
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

module.exports = Summon;