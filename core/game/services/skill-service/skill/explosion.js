const Skill = require('./skill');

/**
 * Explosion skill
 */
class Explosion extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "爆裂魔法";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "explosion";
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
            hp: 500,
            mp: 10000,
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
        // TODO: refactor use magic attack (compute by int)
        const damage = sender.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        const characterSkill = sender.getSkill(this.getStandardName());
        const cost = this.getCost({ level: characterSkill.level });

        sender.costHP(cost);
        sender.costMP(cost);
        sender.costSP(cost);

        action.writeImg('statics/skill-explosion.png');
        action.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();

        return damage;
    }
}


module.exports = Explosion;
