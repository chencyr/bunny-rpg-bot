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
            "雞哥愛丟大便",
            "大便病發作",
            "便意發作",
            "辣雞便秘擊",
            "天空便便落",
            "天空落便便",
            "辣雞便便連擊",
            "雞哥挖便便",
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