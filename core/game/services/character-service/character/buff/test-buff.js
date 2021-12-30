const StandardBuff = require('./standard-buff');

/**
 * TestBuff
 */
class TestBuff extends StandardBuff
{
    /**
     * Constructor
     *
     * @param character
     */
    constructor(character) {
        super(character);
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getName() {
        return "10分鐘魔王的加護"
    }

    /**
     * Buff up
     * @param options
     */
    up(options) {
        const status = this.context.getStatus();
        status.next_exp += 99999999;
        status.max_hp += 30000;
        status.max_mp += 30000;
        status.max_sp += 1000;
        status.str += 1000;
        status.vit += 200;
        status.dex += 1000;
        status.agi += 50;
        status.int += 1000;
        status.luk += 1000;
    }

    /**
     * Buff down
     * @param options
     */
    down(options) {
        const status = this.context.getStatus();
        status.next_exp -= 99999999;
        status.max_hp -= 30000;
        status.max_mp -= 30000;
        status.max_sp -= 1000;
        status.str -= 1000;
        status.vit -= 200;
        status.dex -= 1000;
        status.agi -= 50;
        status.int -= 1000;
        status.luk -= 1000;
    }

    /**
     * Effective
     */
    effect() {
        // not things to do
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 5;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 1000 * 60 * 10;
    }
}

module.exports = TestBuff;