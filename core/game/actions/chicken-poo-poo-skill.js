const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class ChickenPooPooSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "chicken-poo-poo-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "chicken-poo-poo",
            "雞哥便便連擊",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "chicken-poo-poo"
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

module.exports = ChickenPooPooSkill;