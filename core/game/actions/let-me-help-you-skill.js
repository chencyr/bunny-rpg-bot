const Skill = require('./skill');

const SendingBehavior = require('./skill/buff-sending-behavior');
const ReceivingBehavior = require('./skill/buff-receiving-behavior');

/**
 * Skill action.
 */
class LetMeHelpYouSkill extends Skill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "let-me-help-you-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "let me help you",
            "let-me-help-you",
            "Let me help you",
            "讓我幫邦尼",
            "讓我幫幫尼",
            "讓我幫幫你",
            "幫幫尼",
            "幫邦尼",
            "幫尼",
            "邦尼",
            "幫你",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "let-me-help-you"
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

module.exports = LetMeHelpYouSkill;