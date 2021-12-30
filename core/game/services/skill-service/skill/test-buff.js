const Skill = require('./skill');

const Buff = require('../../character-service/character/buff/test-buff');

/**
 * TestBuff skill
 */
class TestBuff extends Skill
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
        return "test-buff";
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
        this.cost(sender);
        return {
            buff: Buff,
            ignore: (repeatIndex, sender, receiver, args) => receiver.isState('dead'),
        };
    }
}


module.exports = TestBuff;
