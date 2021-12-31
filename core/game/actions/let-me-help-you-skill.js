const Skill = require('./skill');

// TODO refactor by service getter
const Buff = require('../../character-service/character/buff/let-me-help-you-buff');

/**
 * LetMeHelpYouSkill skill
 */
class LetMeHelpYouSkill extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "讓我幫邦尼!!";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "let-me-help-you";
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

        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = LetMeHelpYouSkill;
