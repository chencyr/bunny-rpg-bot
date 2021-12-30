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
     * Internal inject for ignore property.
     * @return {function(*, *, *, *): boolean}
     */
    getIgnoreCondition() {
        return (repeatIndex, sender, receiver, args) => receiver.isState('dead');
    }

    /**
     * Get buff ID.
     * @return {string}
     */
    getId() {
        return "auto-hp-regen-buff";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "auto-hp-regen-buff",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return "HP 自然恢復"
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

        const regen = Math.floor(status.max_hp * 0.01);

        if(status.hp + regen > max) {
            status.hp = max;
        }
        else {
            status.hp += regen;
        }
        console.log(`Character ${status.name} regen HP +${regen}, Current HP: ${status.hp}/${status.max_hp}`);
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