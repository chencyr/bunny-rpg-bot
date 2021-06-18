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

    beforeInteraction(senders, receivers) {
        if (senders.length == 0) {
            this.writeMsg(`沒有可執行 [${this.getNames()[0]}] 此操作的對象`); return false;
        }

        if (receivers.length == 0) {
            this.writeMsg(`沒有可接受 [${this.getNames()[0]}] 此操作的對象`); return false;
        }
    }

    afterInteraction(senders, receivers) {

    }

    beforeSend(sender, receivers, args) {

    }

    sending(sender, receivers, args) {
        // TODO: refactor use magic attack (compute by int)
        const damage = sender.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        return damage;
    }

    afterSend(damage, sender, receivers, args) {
        this.writeImg('statics/skill-explosion.png');
        this.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();
    }

    beforeReceived(interaction, sender, receiver, args) {

    }

    receiving(interaction, sender, receiver, args) {
        const characterService = this.context.getService('character-service');
        const result = receiver.receiveDamage(interaction);

        if (result.isDodge == true) {
            this.writeMsg(`${sender.getName()} 轟炸了 ${receiver.getName()}，但技巧很差被 ${receiver.getName()} 閃過了!!`);
            result.continue = true;
        }

        this.writeMsg(`${sender.getName()} 爆裂了 ${receiver.getName()}，${receiver.getName()} 受到 -${result.damageHp} HP 損傷!!`);
        if (receiver.state instanceof characterService.DeadState) {
            this.writeMsg(`${receiver.getName()} 炸開成為屑屑!!`);
        }

        if (result.exp > 0) {
            const isLevelUp = sender.receivedExp(result.exp);
            this.writeMsg(`${sender.getName()} 獲得經驗值 ${result.exp} exp!!`);
            if(isLevelUp) {
                this.writeMsg(`你的等級提升了!! LV.${sender.getLevel()}`);
            }
        }

        return result;
    }

    afterReceived(result, interaction, sender, receiver, args) {

    }

    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        const receivers = await this.getReceivedObjects(to, args);
        const senders = await this.getSendObjects(from, args);

        if (this.beforeInteraction(senders, receivers, args)) {
            return this;
        }

        for (let sender of senders.values()) {

            this.beforeSend(sender, receivers, args);
            const interaction = this.sending(sender, receivers, args);
            this.afterSend(interaction, sender, receivers, args);

            for(let receiver of receivers.values()) {

                this.beforeReceived(interaction, sender, receiver, args);
                const result = this.receiving(interaction, sender, receiver, args);
                if (result.break) break;
                if (result.continue) continue;
                if (result.terminate) return this;
                this.afterReceived(result, interaction, sender, receiver, args);
            }
        }

        if (this.afterInteraction(senders, receivers, args)) {
            return this;
        }
    }
}

module.exports = SkillExplosion;