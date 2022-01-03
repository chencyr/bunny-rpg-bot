const Skill = require('./skill');

/**
 * LairTrick skill
 */
class LairTrick extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "小白的騙術";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "lair-trick";
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
            mp: 5000,
            sp: 1,
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
        damage.accuracy += 9999999;
        damage.value = damage.value * 5;
        damage.max_to = 2;

        action.writeMsg(`[${sender.getName()}] 又開始騙人，被騙的人會玻璃心碎一地...受到內心受到嚴重的創傷!!`).sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = LairTrick;
