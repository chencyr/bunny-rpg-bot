
/**
 * AttackReceivingBehavior base class
 */
class AttackReceivingBehavior
{
    /**
     * Hooker for receiving
     * @param effect
     * @param sender
     * @param receiver
     * @param args
     * @return {object}
     */
    async receiving (effect, sender, receiver, args) {
        const characterService = this.context.getService('character-service');
        const skill = await this.getSkill();
        const result = await receiver.receiveDamage(effect);

        this.writeMsg(`[${sender.getName()}] 對 [${receiver.getName()}] 使用了 [${skill.getDisplayName()}] !!`);

        if (result.isDodge == true) {
            this.writeMsg(`但被 [${receiver.getName()}] 走位很風騷的閃過了!!`);
        }
        else {
            this.writeMsg(`[${receiver.getName()}] 受到 -${result.damageHp} HP 損傷!!`);
            if (receiver.state instanceof characterService.DeadState) {
                this.writeMsg(`[${receiver.getName()}] 已死亡，倒在地上抖動!!`);
            }
        }

        if (result.exp > 0) {
            const isLevelUp = sender.receivedExp(result.exp);
            this.writeMsg(`[${sender.getName()}] 獲得經驗值 ${result.exp} exp!!`);
            if(isLevelUp) {
                this.writeMsg(`[${sender.getName()}] 的等級提升了!! LV.${sender.getLevel()}`);
            }
        }

        return result;
    };
}

module.exports = AttackReceivingBehavior;
