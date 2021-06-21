/**
 * Skill base class
 */
class Skill
{
    /**
     * Constructor
     * @param context {GameEngine}
     */
    constructor(context) {
        this.context = context;
    }

    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "技能";
    }

    /**
     * Get cost info
     * @param options {object}
     * @return {{mp: number, hp: number, sp: number}}
     */
    getCost(options) {
        return {
            hp: 0,
            mp: 0,
            sp: 0,
        };
    }

    //  TODO: refactor to StandardSkill class.
    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "skill";
    }

    // TODO: refactor to StandardSkill class.
    /**
     * Cost to object.
     * @param object
     */
    cost(object) {
        const characterSkill = object.getSkill(this.getStandardName());
        const cost = this.getCost({ level: characterSkill.level });

        object.costHP(cost);
        object.costMP(cost);
        object.costSP(cost);
    }

    /**
     * Restriction Pipeline
     * @param data {object}
     * @param conditions
     * @return {Promise<boolean>}
     */
    async restrict(data, ...conditions) {
        let result = false;

        for (let i in conditions) {
            let condition = conditions[i];
            if(typeof condition === 'string') {
                condition = require(`./condition/${condition}`);
            }
            result = result || await condition.dispatch(data);
        }

        return result;
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async beforeInteraction(senders, receivers, action, args) {
        throw new Error("Not implement error");
    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async afterInteraction(senders, receivers, action, args) {
        throw new Error("Not implement error");
    }

    /**
     * Send effect data.
     * @param sender
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<void>}
     */
    async sending(sender, receivers, action, args) {
        throw new Error("Not implement error");
    }
}


module.exports = Skill;
