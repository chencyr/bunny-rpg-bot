const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class NormalPouchSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "normal-pouch-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "normal-pouch",
            "普通揍一拳",
            "普通一拳",
            "琦玉揍一拳",
            "琦玉一拳",
            "揍一拳",
            "一拳",
            "一擊",
            "普通一擊",
            "琦玉一擊",
            "琦玉的一擊",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "normal-pouch"
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

module.exports = NormalPouchSkill;