const StandardSkill = require('./standard-skill');

/**
 * Skill action.
 */
class ChickenPooPooSkill extends StandardSkill
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "chicken-poo-poo-skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "chicken-poo-poo",
            "雞哥便便連擊",
        ];
    }

    /**
     * Get skill name. (should same as skill class file name)
     * @return {string} standard name
     */
    getSkillName() {
        return "chicken-poo-poo"
    }
}

module.exports = ChickenPooPooSkill;