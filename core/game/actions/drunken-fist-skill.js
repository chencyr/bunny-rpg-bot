const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class DrunkenFistSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "drunken-fist-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "drunken-fist",
            "醉拳",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "drunken-fist"
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

module.exports = DrunkenFistSkill;