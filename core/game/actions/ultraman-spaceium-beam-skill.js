const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class UltramanSpaceiumBeamSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "ultraman-spaceium-beam-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "ultraman-spaceium-beam",
            "宇宙物質光線",
            "奧特曼光線",
            "宇宙物質光束",
            "奧特曼光束",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "ultraman-spaceium-beam"
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

module.exports = UltramanSpaceiumBeamSkill;