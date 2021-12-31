const Skill = require('./skill');


// TODO refactor by service getter
const randomFromArray = require('../../../helpers/randomFromArray');
const Buff = require('../../character-service/character/buff/let-me-help-you-buff');

/**
 * LetMeHelpYou skill
 */
class LetMeHelpYou extends Skill
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

        const slogan = randomFromArray([
            "想當我前男友嗎？很簡單啊，交往一分鐘再分手就可以了",
            "嘿嘿嘿嘿嘿 哈哈哈哈哈",
            "大家要共體時艱，下個月就會拿到薪水",
            "我們一起同進退，薪水沒關係，我可以等",
            "沒錢吃拉麵，在家吃泡麵",
            "阿法的優勢是海咪咪",
            "袋鼠蛋蛋?",
        ]);

        action.writeMsg(slogan).sendMsg();
        // some adjust for buff.

        this.cost(sender);

        return buff;
    }
}


module.exports = LetMeHelpYou;
