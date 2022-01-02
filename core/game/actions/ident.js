const Action = require('./action');
const board = require('./utils/output-status-board')

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
            "Ident",
            "鑑定",
            "鑒定",
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

        let ids = to.map((item) => item.characterId)
            .filter((item) => !(item === undefined))
            .concat(args);

        const characters = await characterService.getByIds(ids);
        const character1 = await characterService.getById(from.characterId);

        if (!character1 || !characters.length > 0) {
            throw new Error('Cannot find character error');
        }

        characters.forEach((character2) => {
            this.writeMsg(`[${character1.getName()}] 對 [${character2.getName()}] 使用了鑑定 !!`)
                .writeMsg(" ")
                .writeMsg(board(character2))
        });
    }
}

module.exports = Ident;