const Skill = require('./skill');

/**
 * StrAttack skill
 */
class StrAttack extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "攻擊";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "str-attack";
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
            hp: 100,
            mp: 0,
            sp: 20,
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
        const damage = sender.createDamage();

        this.cost(sender);
        return damage;
    }
}


module.exports = StrAttack;
