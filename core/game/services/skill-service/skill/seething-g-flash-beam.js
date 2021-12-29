const Skill = require('./skill');

/**
 * SeethingGFlashBeamSkill skill
 */
class SeethingGFlashBeam extends Skill
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
            hp: 10000,
            mp: 10000,
            sp: 150,
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
        damage.value = damage.value * 7;

        action.writeImg('statics/skill-ultraman-spaceium-beam.jpg');
        action.writeMsg('尾崎通過新轟天號將「凱撒能量」注入哥斯拉的背鰭後釋放出了究極紅色熱線 !!').sendMsg();

        this.cost(sender);
        return damage;
    }
}


module.exports = SeethingGFlashBeam;
