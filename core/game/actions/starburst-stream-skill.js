const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class StarburstStreamSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "starburst-stream-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "starburst-stream",
            "星爆氣流斬",
            "C8763",
            "c8763",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "starburst-stream"
    }
}

module.exports = StarburstStreamSkill;