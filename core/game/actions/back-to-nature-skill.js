const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class BackToNatureSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "back-to-nature-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "back-to-nature",
            "回歸大自然",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "back-to-nature"
    }
}

module.exports = BackToNatureSkill;