const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class RazorLeafSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "razor-leaf-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "razor-leaf",
            "飛葉快刀",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "razor-leaf"
    }
}

module.exports = RazorLeafSkill;