const Character = require('../../../character-service/character/character');

/**
 * CharactersHasSkill action.
 */
class CharactersHasSkill
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
            const sender = senders[i];
            if (! (sender instanceof Character)) {
                action.writeMsg(`[${sender.getName()}] 必須是角色才可以使用技能 [${skill.getDisplayName()}]`);
                return true;
            }
            if (! sender.hasSkill(skill.getStandardName())) {
                action.writeMsg(`[${sender.getName()}] 沒有技能 [${skill.getDisplayName()}]`);
                return true;
            }
        }

        return false;
    }
}

module.exports = CharactersHasSkill;