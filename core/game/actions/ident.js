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

        let text = `名稱: ${character2.getName()}   等級: ${character2.getLevel()}   職業: ${character2.getJob()}\n`;
        text += `狀態: ${character2.getState()}   稱號: ${character2.getTitle()}\n`;
        text += `經驗值: ${character2.getExp()}\n`;
        text += `HP: ${character2.currentHP}/${character2.maxHP}\n`;
        text += `MP: ${character2.currentMP}/${character2.maxMP}\n`;
        text += `SP: ${character2.currentSP}/${character2.maxSP}\n`;
        text += `STR: ${character2.str}    VIT: ${character2.vit}\n`;
        text += `DEX: ${character2.dex}    AGI: ${character2.agi}\n`;
        text += `INT: ${character2.int}    LUK: ${character2.luk}\n`;

        this.writeMsg(`${character1.getName()} 對 ${character2.getName()} 使用了鑑定 !!`)
            .writeMsg(" ")
            .writeMsg(text)
    }
}

module.exports = Ident;