const Skill = require('./skill');

const SendingBehavior = require('./skill/attack-sending-behavior');
const ReceivingBehavior = require('./skill/attack-receiving-behavior');

/**
 * Skill action.
 */
class RoundAndRoundSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "round-and-round-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "round-and-round",
            "轉圈圈",
            "轉圈",
            "轉轉轉",
            "圈圈",
            "Loading..",
            "Loading...",
            "Loading....",
            "loading..",
            "loading...",
            "loading....",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "round-and-round"
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

module.exports = RoundAndRoundSkill;