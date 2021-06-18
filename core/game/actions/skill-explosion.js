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

    /* abstract */
    /**
     * Get send game object for this action.
     * @param from
     * @param args
     * @return {Promise<void>}
     */
    async getSendObjects(from, args) {
        const characterService = this.context.getService('character-service');
        let ids = [from]
            .reduce((carry, item) => carry.concat([item.characterId]), [])
        return await characterService.getByIds(ids);
    }

    /* abstract */
    /**
     * Get received game object for this action.
     * @param to
     * @param args
     * @return {Promise<Array>}
     */
    async getReceivedObjects(to, args) {
        const characterService = this.context.getService('character-service');
        let ids = to
            .reduce((carry, item) => carry.concat([item.characterId]), [])
            .filter((item) => item === undefined)
            .concat(args);

        ids = this.filterDuplicate(ids);
        return await characterService.getByIds(ids);
    }

    /**
     * Remove duplicate value in array.
     * @param arr {array}
     * @return {array}
     */
    filterDuplicate (arr) {
        return arr.filter((item, index) => arr.indexOf(item) === index);
    }

    before(senders, receivers) {
        if (senders.length == 0) {
            this.writeMsg(`沒有可執行 [${this.getNames()[0]}] 此操作的對象`); return false;
        }

        if (receivers.length == 0) {
            this.writeMsg(`沒有可接受 [${this.getNames()[0]}] 此操作的對象`); return false;
        }
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
        // const characters = await this.getCharacters(to, args);


        const receivers = await this.getReceivedObjects(to, args);
        const senders = await this.getSendObjects(from, args);


        if (! this.before(senders, receivers)) {
            return this;
        }


        // TODO: refactor use magic attack (compute by int)
        const damage = character1.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        this.writeImg();
        this.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();

        for(let index in receivers) {
            const character2 = receivers[index];
            const result = character2.receiveDamage(damage);

            if (result.isDodge == true) {
                this.writeMsg(`${character1.getName()} 轟炸了 ${character2.getName()}，但技巧很差被 ${character2.getName()} 閃過了!!`);
                continue;
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