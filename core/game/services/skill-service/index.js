/**
 * Skill service, service should run as singleton.
 */
class SkillService
{
    /**
     * Constructor
     * @param context {GameEngine}
     */
    constructor(context) {
        this.context = context;
    }

    /**
     * Create model instance.
     * @return {Skill}
     */
    skillModel() {
        return this.context.createModel('skills');
    }

    /**
     * Check engine has object instance.
     * @param name {Skill} Skill standard name
     */
    async has(name) {
        const condition = { standard_name: name };
        return await this.skillModel().exist(condition);
    }

    /**
     * Get skill instance, and return null if skill not exists.
     * @param name {string} Standard name
     * @return {Promise<*>}
     */
    async getByName(name) {
        const objType = 'skill';
        const model = this.skillModel();

        if (this.context.hasObject(objType, name)) {
            return this.context.getObject(objType, name);
        }

        const records = await model.getRecord({ standard_name: name });
        if (records.length > 0) {
            // TODO should used diff loader by skills.type
            const Class = require(`./skill/${records[0].standard_name}`);
            const skill = new Class(this);
            this.context.setObject(objType, skill, name);

            return skill;
        }

        return null;
    }
}


module.exports = SkillService;
