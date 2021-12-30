const Skill = require('./skill');

/**
 * AsBoss skill
 */
class AsBoss extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "成為魔王吧!!";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "as-boss";
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @param action
     * @param args
     * @return {Promise<boolean>}
     */
    async beforeInteraction(senders, receivers, action, args) {
        const data = {
            skill: this,
            senders: senders,
            receivers: receivers,
            action: action,
            args: args
        };

        return await this.restrict(data,
            'characters-has-skill',
            'characters-cost-enough',
            'receivers-is-character',
        );
    }

    /**
     * Get cost info
     * @param options {object}
     * @return {{mp: number, hp: number, sp: number}}
     */
    getCost(options) {
        return {
            hp: 1000,
            mp: 1000,
            sp: 1000,
        };
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
        const buffName = 'as-boss';
        const characterService = this.context.getService('character-service');
        const buff = characterService.createBuff(buffName); // get buff instance.

        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = AsBoss;
