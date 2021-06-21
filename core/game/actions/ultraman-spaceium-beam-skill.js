const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class UltramanSpaceiumBeamSkill extends StandardSkill
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
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "ultraman-spaceium-beam"
    }
}

module.exports = UltramanSpaceiumBeamSkill;