const Skill = require('./skill');

/**
 * RazorLeaf skill
 */
class UltramanSpaceiumBeam extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "奧特曼光線";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "ultraman-spaceium-beam";
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
            mp: 1000,
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
        action.writeImg('statics/skill-ultraman-spaceium-beam-gj.jpg');
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
        damage.value = damage.value * 2;

        action.writeImg('statics/skill-ultraman-spaceium-beam.jpg');
        action.writeMsg('スペシウム光线!! (宇宙物質光束!!)').sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = UltramanSpaceiumBeam;
