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
     * Add level for character
     * @param character
     * @param args
     */
    addLevel(character, args) {
        let level = args[1] || 0;
        if(isNaN(level)) {
            return;
        }
        level = parseInt(level);
        if(level < 0 || level > 10000) {
            return;
        }

        character.addLevels(level);
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

        const condition = {
            user_type: 'monster',
            user_id: args[0],
        };

        const character = await characterService.getByCondition(condition);
        const newCharacter = character.clone();
        this.addLevel(newCharacter, args);

        const objectId = newCharacter.getId();
        characterService.initWithObjectPool(newCharacter, objectId);

        this.writeMsg(`[${player.getName()}] 成功召喚了一個狠角色 !!`)
            .writeMsg(`他的名字是 ... [${newCharacter.getName()}] !!!`)
            .sendMsg();

        const slogan = newCharacter.getSlogan();
        if(slogan !== null) {
            this.writeMsg(`${slogan}`);
        }

        const image = newCharacter.getImage();
        if(image !== null) {
            this.writeImg(`statics/${image}`);
        }

        this.writeMsg(`物件編號: ${objectId}`);
    }
}

module.exports = Summon;