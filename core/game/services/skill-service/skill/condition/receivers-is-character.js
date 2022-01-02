const Character = require('../../../character-service/character/character');

/**
 * ReceiversIsCharacter condition.
 */
class ReceiversIsCharacter
{
    /**
     * Condition dispatch
     * @param skill
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<boolean>}
     */
    static async dispatch({skill, senders, receivers, action, args}) {

        for (let i in senders) {
            const receiver = receivers[i];
            if (! (receiver instanceof Character)) {
                action.writeMsg(`技能 [${skill.getDisplayName()}] 的使用對象 [${receiver.getName()}] 必須是角色`);
                return true;
            }

            const verify = receiver.verifyReceivedDamage(skill, senders, action, args);
            if (! verify.canDo) {
                action.writeMsg(verify.reason);
                return true;
            }
        }

        return false;
    }
}

module.exports = ReceiversIsCharacter;