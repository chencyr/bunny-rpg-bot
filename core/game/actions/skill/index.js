const InteractionAction = require('../interaction');

const DefaultSendingBehavior = require('./sending-behavior');
const DefaultReceivingBehavior = require('./receiving-behavior');

/**
 * Skill action.
 */
class Index extends InteractionAction
{
    /**
     * Constructor
     *
     * @param context
     */
    constructor(context) {
        super(context)

        const handler = {
            get: function(target, name) {

                if (name == 'sending') {
                    return Reflect.get(target.getSendingBehavior().prototype, "sending");
                }

                if (name == 'receiving') {
                    return Reflect.get(target.getReceivingBehavior().prototype, "receiving");
                }

                return Reflect.get(target, name);
            },
        };

        return new Proxy(this, handler);
    }

    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "skill";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "skill",
        ];
    }

    /**
     * Get skill name.
     * @return {string} standard name
     */
    getSkillName() {
        throw new Error("Skill's standard name not defined error.");
    }

    /**
     * Get sending behavior.
     * @return {SendingBehavior}
     */
    getSendingBehavior() {
        return DefaultSendingBehavior;
    }

    /**
     * Get receiving behavior.
     * @return {ReceivingBehavior}
     */
    getReceivingBehavior() {
        return DefaultReceivingBehavior
    }

    /**
     * Get skill instance from service.
     * @return {Promise<*>}
     */
    async getSkill() {
        if (! this.skill) {
            this.skill = await this.context
                .getService("skill-service")
                .getByName(this.getSkillName());
        }

        return this.skill;
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @param args
     * @return {boolean} return true will break interaction flow
     */
    async beforeInteraction(senders, receivers, args) {
        if (senders.length == 0) {
            this.writeMsg(`沒有可執行 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        if (receivers.length == 0) {
            this.writeMsg(`沒有可接受 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        const skill = await this.getSkill();
        if (await skill.beforeInteraction(senders, receivers, this, args)) {
            return true;
        }
    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @param args
     * @return {boolean}
     */
    async afterInteraction(senders, receivers, args) {
        const skill = await this.getSkill();
        if (await skill.afterInteraction(senders, receivers, this, args)) {
            return true;
        }
    }
}

module.exports = Index;