const Skill = require('./skill');


// TODO refactor by service getter
const randomFromArray = require('../../../helpers/randomFromArray');
const Buff = require('../../character-service/character/buff/thunder-bird-debuff');

/**
 * ThunderBird skill
 */
class ThunderBird extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "雷神鳥胃的詛咒";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "thunder-bird";
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
            sp: 20,
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
            "偶愛粗誰果 🍉🐤~",
            "誰果好粗～🍉🐤",
        ]);

        action.writeImg('statics/thunder-bird.jpeg');
        action.writeMsg(slogan).sendMsg();

        action.writeMsg('將自身的雷包屬性附加給其他對像，被雷到的對象會隨機下降 STR, VIT, AGI 一項能力值');
        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = ThunderBird;
