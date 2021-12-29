const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class StrAttackSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "str-attack-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "attack",
            "攻擊",
            "打",
            "肛",
            "Attack",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "str-attack"
    }
}

module.exports = StrAttackSkill;