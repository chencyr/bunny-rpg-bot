const Skill = require('./skill');

const SendingBehavior = require('./skill/buff-sending-behavior');
const ReceivingBehavior = require('./skill/buff-receiving-behavior');

/**
 * Skill action.
 */
class ThunderBird extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "thunder-bird";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "thunder-bird",
            "雷神鳥胃的詛咒",
            "雷神的詛咒",
            "鳥胃的詛咒",
            "雷你",
            "雷神鳥胃",
            "鳥胃",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "thunder-bird"
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

module.exports = ThunderBird;