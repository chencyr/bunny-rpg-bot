const Skill = require('./skill');

/**
 * RoundAndRound skill
 */
class RoundAndRound extends Skill
{
    /**
     * Get display name.
     * @return {string}
     */
    getDisplayName() {
        return "轉圈圈";
    }

    /**
     * Get standard name.
     * @return {string}
     */
    getStandardName() {
        return "round-and-round";
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
            hp: 2000,
            mp: 10000,
            sp: 30,
        };
    }

    /**
     * Set each character new state
     * @param characters
     * @param action
     */
    setState(characters, action) {
        characters.forEach((character) => {
            action.writeMsg(`${character.getName()} 看了一直旋轉的畫面終於不支倒地....`);
            character.changeState('knocked-out');
        });
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
        this.setState(receivers, action);
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
        damage.value = damage.value * 0.3;

        this.cost(sender);
        action.writeMsg('Loading.............(轉轉轉)').sendMsg();

        return damage;
    }
}


module.exports = RoundAndRound;
