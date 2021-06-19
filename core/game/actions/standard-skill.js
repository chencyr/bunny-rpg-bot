const InteractionAction = require('./interaction');

/**
 * Skill action.
 */
class StandardSkill extends InteractionAction
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "standard-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "standard-skill",
        ];
    }

    /**
     * Get skill name.
     * @return {string} standard name
     */
    getSkillName() {
        throw new Error("Skill's standard name not defined error.");
    }

    /**
     * Get skill instance from service.
     * @return {Promise<*>}
     */
    async getSkill() {
        if (! this.skill) {
            this.skill = await this.context
                .getService("skill-service")
                .getByName(this.getSkillName());
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
        const skill = await this.getSkill();
        const result = receiver.receiveDamage(effect);

        this.writeMsg(`[${sender.getName()}] 對 [${receiver.getName()}] 使用了 [${skill.getDisplayName()}] !!`);

        if (result.isDodge == true) {
            this.writeMsg(`但被 [${receiver.getName()}] 走位很風騷的閃過了!!`);
            result.continue = true;
        }

        this.writeMsg(`[${receiver.getName()}] 受到 -${result.damageHp} HP 損傷!!`);
        if (receiver.state instanceof characterService.DeadState) {
            this.writeMsg(`[${receiver.getName()}] 已死亡，倒在地上抖動!!`);
        }

        if (result.exp > 0) {
            const isLevelUp = sender.receivedExp(result.exp);
            this.writeMsg(`[${sender.getName()}] 獲得經驗值 ${result.exp} exp!!`);
            if(isLevelUp) {
                this.writeMsg(`[${sender.getName()}] 的等級提升了!! LV.${sender.getLevel()}`);
            }
        }

        return result;
    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @param args
     * @return {boolean}
     */
    async afterInteraction(senders, receivers, args) {
        const skill = await this.getSkill();
        if (await skill.beforeInteraction(senders, receivers)) {
            return true;
        }
    }
}

module.exports = StandardSkill;