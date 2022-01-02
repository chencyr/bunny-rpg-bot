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
            "出來吧",
            "出來啊",
            "出來",
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

        // TODO refactor method, static value

        let level = args[1] || 15;
        if(isNaN(level)) {
            level = 15;
        }
        level = parseInt(level);
        if(level < 0 || level > 10000) {
            level = 15
        }

        level -= 1;

        const condition = {
            user_type: 'monster',
            user_id: args[0],
        };
        const character = await characterService.getByCondition(condition);

        const newCharacter = character.clone();
        newCharacter.addLevels(level);

        const objectId = newCharacter.getId();
        characterService.initWithObjectPool(newCharacter, objectId);

        this.writeMsg(`[${player.getName()}] 成功召喚了一個狠角色 !!`)
            .writeMsg(`他的名字是...「${newCharacter.getName()}」!!!`)
            .sendMsg()
            .writeMsg(`物件編號: ${objectId}`)
    }
}

module.exports = Summon;