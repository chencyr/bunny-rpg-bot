const InteractionAction = require('./interaction');

/**
 * Skill action.
 */
class SkillExplosion extends InteractionAction
{
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
     * Get skill instance from service.
     * @return {Promise<*>}
     */
    async getSkill() {
        if (! this.skill) {
            this.skill = await this.context.getService("skill-service").getByName("explosion");
        }

        return this.skill;
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @return {boolean} return true will break interaction flow
     */
    async beforeInteraction(senders, receivers) {
        if (senders.length == 0) {
            this.writeMsg(`沒有可執行 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        if (receivers.length == 0) {
            this.writeMsg(`沒有可接受 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        const skill = await this.getSkill();
        if (await skill.beforeInteraction(senders, receivers)) {
            return true;
        }
    }

    /**
     * Hooker for sending
     * @param sender
     * @param receivers
     * @param args
     * @return {object}
     */
    async sending(sender, receivers, args) {
        const skill = await this.getSkill();
        return await skill.sending(sender, receivers, this, args);
    }

    /**
     * Hooker for receiving
     * @param effect
     * @param sender
     * @param receiver
     * @param args
     * @return {object}
     */
    async receiving(effect, sender, receiver, args) {
        const characterService = this.context.getService('character-service');
        const result = receiver.receiveDamage(effect);

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
}

module.exports = SkillExplosion;