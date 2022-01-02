
/**
 * BuffSendingBehavior base class
 */
class BuffSendingBehavior
{
    // TODO refactor snedingBuff
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
}

module.exports = BuffSendingBehavior;
