const Skill = require('./skill');

const SendingBehavior = require('./skill/buff-sending-behavior');
const ReceivingBehavior = require('./skill/buff-receiving-behavior');

/**
 * Skill action.
 */
class AsBossBuffSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "as-boss-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "as-boss",
            "魔王的加護",
            "成為魔王吧",
            "魔王",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "as-boss"
    }

    /**
     * Get sending behavior.
     * @return {SendingBehavior}
     */
    getSendingBehavior() {
        return SendingBehavior;
    }

    /**
     * Get receiving behavior.
     * @return {ReceivingBehavior}
     */
    getReceivingBehavior() {
        return ReceivingBehavior
    }
}

module.exports = AsBossBuffSkill;