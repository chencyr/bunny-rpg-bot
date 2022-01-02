const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class LairTrick extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "lair-trick-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "lair-trick",
            "小白的騙術",
            "小白騙術",
            "騙術",
            "小白大騙子",
            "大騙子",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "lair-trick"
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

module.exports = LairTrick;