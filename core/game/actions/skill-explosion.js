const Action = require('./action');

/**
 * Skill action.
 */
class SkillExplosion extends Action
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
        return "skill-explosion";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "explosion",
            "爆裂魔法",
        ];
    }

    /**
     * Get characters from all params.
     * @param to
     * @param args
     * @return {Promise<Array>}
     */
    async getCharacters(to, args) {
        const characterService = this.context.getService('character-service');
        const characters = [];

        if (to.length > 0) {
            for(let index in to) {
                const item = to[index];
                const character = await characterService.getById(item.characterId);
                if (character) {
                    characters.push(character);
                }
            }
        }

        for(let index in args) {
            const item = args[index];
            const character = await characterService.getById(item);
            if (character) {
                characters.push(character);
            }
        }

        return characters;
    }

    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        const characterService = this.context.getService('character-service');
        const character1 = await characterService.getById(from.characterId);
        const characters = await this.getCharacters(to, args);

        if (! character1) {
            throw new Error('Cannot find character error');
        }

        if (characters.length == 0) {
            this.writeMsg(`施放失敗，沒有指定施放的對象`);
            return this;
        }

        // TODO: refactor use magic attack (compute by int)
        const damage = character1.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        this.writeImg();
        this.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();

        for(let index in characters) {
            const character2 = characters[index];
            const result = character2.receiveDamage(damage);

            if (result.isDodge == true) {
                this.writeMsg(`${character1.getName()} 轟炸了 ${character2.getName()}，但技巧很差被 ${character2.getName()} 閃過了!!`);
                return this;
            }

            this.writeMsg(`${character1.getName()} 爆裂了 ${character2.getName()}，${character2.getName()} 受到 -${result.damageHp} HP 損傷!!`);
            if (character2.state instanceof characterService.DeadState) {
                this.writeMsg(`${character2.getName()} 炸開成為屑屑!!`);
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
}

module.exports = SkillExplosion;