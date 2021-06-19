const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class ExplosionSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "explosion-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "explosion",
            "爆裂魔法",
        ];
    }

    /**
     * Get skill name.
     * @return {string} standard name
     */
    getSkillName() {
        return "explosion"
    }
}

module.exports = ExplosionSkill;