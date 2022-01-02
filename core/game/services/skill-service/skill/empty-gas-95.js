const Skill = require('./skill');


// TODO refactor by service getter
const randomFromArray = require('../../../helpers/randomFromArray');
const Buff = require('../../character-service/character/buff/empty-gas-95-buff');

/**
 * EmptyGas95 skill
 */
class EmptyGas95 extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "95倒光";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "empty-gas-95";
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
            hp: 8000,
            mp: 0,
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
            "95 倒光光 >_<",
        ]);

        action.writeImg('statics/empty-gas-95.jpg');
        action.writeMsg(slogan).sendMsg();
        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = EmptyGas95;
