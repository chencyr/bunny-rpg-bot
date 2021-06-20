const Character = require('../../../character-service/character/character');

/**
 * CharactersCostEnough condition.
 */
class CharactersCostEnough
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

            const characterSkill = sender.getSkill(skill.getStandardName());
            const cost = skill.getCost({ level: characterSkill.level });

            if (sender.afterCostHP(cost.hp) <= 0) {
                action.writeMsg(`[${sender.getName()}] 沒有足夠的 HP 使用技能 [${skill.getDisplayName()}]`);
                return true;
            }
            if (sender.afterCostMP(cost.mp) < 0) {
                action.writeMsg(`[${sender.getName()}] 沒有足夠的 MP 使用技能 [${skill.getDisplayName()}]`);
                return true;
            }
            if (sender.afterCostSP(cost.sp) < 0) {
                action.writeMsg(`[${sender.getName()}] 沒有足夠的 SP 使用技能 [${skill.getDisplayName()}]`);
                return true;
            }
        }

        return false;
    }
}

module.exports = CharactersCostEnough;