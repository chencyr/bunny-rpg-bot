const Skill = require('./skill');

/**
 * DrunkenFist skill
 */
class DrunkenFist extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "醉拳";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "drunken-fist";
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
            mp: 100,
            sp: 70,
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
        damage.value = damage.value * 7;
        damage.accuracy -= 100;

        action.writeImg('statics/skill-drunken-fist.jpg');

        action.writeMsg('摸摸大鼻子，搖搖晃晃的打出一拳!!').sendMsg();
        this.cost(sender);
        return damage;
    }
}


module.exports = DrunkenFist;
