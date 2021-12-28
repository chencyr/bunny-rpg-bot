const Action = require('./action');

/**
 * Attack action.
 */
class Attack extends Action
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
        return "attack";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "attack",
            "攻擊",
            "打",
            "肛",
            "Attack",
        ];
    }

    // TODO refactor by standard skill
    /**
     * Get cost info
     * @param options {object}
     * @return {{mp: number, hp: number, sp: number}}
     */
    getCost(options) {
        return {
            hp: 0,
            mp: 0,
            sp: 20,
        };
    }

    // TODO refactor by standard skill
    /**
     * Cost to object.
     * @param object
     */
    cost(object) {
        const cost = this.getCost({});

        object.costHP(cost);
        object.costMP(cost);
        object.costSP(cost);
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

        const damage = character1.createDamage();
        this.cost(character1);

        const result = character2.receiveDamage(damage);

        if (result.isDodge == true) {
            this.writeMsg(`${character1.getName()} 攻擊了 ${character2.getName()}，但技巧很差被 ${character2.getName()} 閃過了!!`);
            return this;
        }

        this.writeMsg(`${character1.getName()} 攻擊了 ${character2.getName()}，${character2.getName()} 受到 -${result.damageHp} HP 損傷!!`);
        if (character2.state instanceof characterService.DeadState) {
            this.writeMsg(`${character2.getName()} 已死亡倒在地上抖動!!`);
        }

        if (result.exp > 0) {
            const isLevelUp = character1.receivedExp(result.exp);
            this.writeMsg(`${character1.getName()} 獲得經驗值 ${result.exp} exp!!`);
            if(isLevelUp) {
                this.writeMsg(`你的等級提升了!! LV.${character1.getLevel()}`);
            }
        }
    }
}

module.exports = Attack;