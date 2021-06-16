const Action = require('./action');

/**
 * Ident action.
 */
class Ident extends Action
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
        return "ident";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "ident",
            "鑑定",
            "Ident",
        ];
    }

    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        // TODO: refactor for all type game objects.
        const characterService = this.context.getService('character-service');

        if (to.length == 0) {
            if (! args[0]) {
                throw new Error('Cannot find character error');
            }
            to.characterId = args[0];
        }
        else {
            to = to[0];
        }

        const character1 = await characterService.getById(from.characterId);
        const character2 = await characterService.getById(to.characterId);

        if (!character1 || !character2) {
            throw new Error('Cannot find character error');
        }

        const status = character2.getStatus();

        let text = `名稱: ${character2.getName()}   等級: ${character2.getLevel()}   職業: ${character2.getJob()}\n`;
        text += `狀態:${character2.getState()}   稱號: ${character2.getTitle()}\n`;
        text += `經驗值: ${character2.getExp()}\n`;
        text += `HP: ${status.hp}/${status.max_hp}    MP: ${status.mp}/${status.max_mp}\n`;
        text += `STR: ${status.str}    VIT: ${status.vit}\n`;
        text += `DEX: ${status.dex}    AGI: ${status.agi}\n`;
        text += `INT: ${status.int}    LUK: ${status.luk}\n`;

        this.writeMsg(`${character1.getName()} 對 ${character2.getName()} 使用了鑑定 !!`)
            .writeMsg(" ")
            .writeMsg(text)
    }
}

module.exports = Ident;