const Skill = require('./skill');


// TODO refactor by service getter
const randomFromArray = require('../../../helpers/randomFromArray');
const Buff = require('../../character-service/character/buff/full-gas-95-buff');

/**
 * FullGas95 skill
 */
class FullGas95 extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "95加滿";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "full-gas-95";
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
            mp: 8000,
            sp: 0,
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

        const buff = new Buff();

        const slogan = randomFromArray([
            "你要 +5，還是 +95？ >_0",
        ]);

        action.writeImg('statics/full-gas-95.jpeg');
        action.writeMsg(slogan).sendMsg();
        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = FullGas95;
