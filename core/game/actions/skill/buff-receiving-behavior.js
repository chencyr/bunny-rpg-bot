
/**
 * BuffReceivingBehavior base class
 */
class BuffReceivingBehavior
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
        const skill = await this.getSkill();
        const result = receiver.receiveBuff(effect);

        this.writeMsg(`[${sender.getName()}] 對 [${receiver.getName()}] 使用了 [${skill.getDisplayName()}] !!`);

        if (result.isFail) {
            this.writeMsg(`但因 [${result.failReason()}] 的原因失敗了!! 無情!!`);
        }
        else {
            this.writeMsg(`[${receiver.getName()}] 成功獲得了 [${result.buff.getName()}] 的效果!! 爽啦!!`);
        }

        return result;
    };
}

module.exports = BuffReceivingBehavior;
