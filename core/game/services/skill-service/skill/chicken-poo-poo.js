const Skill = require('./skill');

/**
 * ChickenPooPoo skill
 */
class ChickenPooPoo extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "雞哥便便連擊";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "chicken-poo-poo";
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
        damage.value = damage.value * 0.5;
        damage.accuracy = damage.accuracy + 200;
        damage.repeat = 10;

        action.writeMsg('大便病發作惹~~~~').sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = ChickenPooPoo;
