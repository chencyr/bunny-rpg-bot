const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class StarburstStreamSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "starburst-stream-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "starburst-stream",
            "星爆氣流斬",
            "C8763",
            "c8763",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "starburst-stream"
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

module.exports = StarburstStreamSkill;