const StandardBuff = require('./standard-buff');

/**
 * AutoHpRegenBuff
 */
class AutoHpRegenBuff extends StandardBuff
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
     * Effective
     */
    effect() {
        const status = this.getContext().getStatus();
        const max = status.max_hp;

        if(max == status.hp) {
            return;
        }

        const regen = Math.floor(status.max_hp * 0.03);

        if(status.hp + regen > max) {
            status.hp = max;
        }
        else {
            status.hp += regen;
        }
        console.log(`Character regen HP +${regen}, Current HP: ${status.hp}/${status.max_hp}`);
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 10;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 0;
    }
}

module.exports = AutoHpRegenBuff;