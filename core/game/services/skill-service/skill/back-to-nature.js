const Skill = require('./skill');

/**
 * BackToNature skill
 */
class BackToNature extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "回歸大自然...的某種攻擊";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "back-to-nature";
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
            hp: 0,
            mp: 10,
            sp: 10,
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
        damage.value = damage.value * 10;
        damage.accuracy = damage.accuracy * 1000;

        this.cost(sender);
        return damage;
    }
}


module.exports = BackToNature;
