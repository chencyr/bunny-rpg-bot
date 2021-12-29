const Skill = require('./skill');

/**
 * StarburstStream skill
 */
class StarburstStream extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "星爆氣流斬";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "starburst-stream";
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
            mp: 100,
            sp: 100,
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
        // TODO: refactor use magic attack (compute by int)
        const damage = sender.createDamage();
        damage.repeat = 16;

        action.writeImg('statics/skill-starburst-stream.jpg');
        action.writeMsg('亞絲娜，克萊因。拜託了！幫我撐個10秒左右就好！！').sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = StarburstStream;
