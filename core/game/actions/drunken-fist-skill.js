const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class DrunkenFistSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "drunken-fist-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "drunken-fist",
            "醉拳",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "drunken-fist"
    }
}

module.exports = DrunkenFistSkill;