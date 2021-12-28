const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class SeethingGFlashBeamSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "seething-g-flash-beam-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "seething-g-flash-beam",
            "紅蓮G閃光熱線",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "seething-g-flash-beam"
    }
}

module.exports = SeethingGFlashBeamSkill;