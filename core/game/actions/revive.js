const Action = require('./action');

/**
 * Revive action.
 */
class Revive extends Action
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
        return "revive";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "revive",
            "復活",
            "爬起來",
            "別死啊",
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

        this.writeMsg(`${character1.getName()} 大大，你不要偷用 GM 的指令鴨 !!`);

        // if (! character2.state instanceof characterService.DeadState) {
        //     this.writeMsg(`${character1.getName()} 大大，${character2.getName()} 人都還沒屎，是在哈囉?`);
        //     return this;
        // }
        //
        // character2.changeState(characterService.NormalState.name());
        // this.writeMsg(`${character1.getName()} 復活了 ${character2.getName()}，${character2.getName()} 現在又是一條好漢!!`);
    }
}

module.exports = Revive;