const Skill = require('./skill');

const SendingBehavior = require('./skill/buff-sending-behavior');
const ReceivingBehavior = require('./skill/buff-receiving-behavior');

/**
 * Skill action.
 */
class EmptyGas95Skill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "empty-gas-95-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "empty-gas-95",
            "95倒光謝謝",
            "倒光95謝謝",
            "95倒光",
            "倒光95",
            "倒95",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "full-gas-95"
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

module.exports = EmptyGas95Skill;