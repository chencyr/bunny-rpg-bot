const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class SeethingGFlashBeamSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "seething-g-flash-beam-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "seething-g-flash-beam",
            "紅蓮G閃光熱線",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "seething-g-flash-beam"
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

module.exports = SeethingGFlashBeamSkill;