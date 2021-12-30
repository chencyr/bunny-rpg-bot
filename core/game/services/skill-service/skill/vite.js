const Skill = require('./skill');

/**
 * Vite skill
 */
class Vite extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "Vite 打包術";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "vite";
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
            hp: 10000,
            mp: 0,
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
        damage.accuracy = damage.accuracy + 20000;
        damage.max_to = 50;

        action.writeMsg('Vite 妳們！啾咪 >_0').sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = Vite;
