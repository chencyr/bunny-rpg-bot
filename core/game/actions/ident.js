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

        this.writeMsg(`${character1.getName()} 對 ${character2.getName()} 使用了鑑定 !!`)
            .writeMsg(" ")
            .writeMsg(board(character2))
    }
}

module.exports = Ident;