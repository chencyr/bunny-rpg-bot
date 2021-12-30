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
            "auto-ha" +
            "p-regen-buff",
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
        const character = this.getContext();
        const max = character.maxHP;

        if(max == character.currentHP) {
            return;
        }

        const regen = Math.floor(character.maxHP * 0.01);

        if(character.currentHP + regen > max) {
            character.currentHP = max;
        }
        else {
            character.currentHP += regen;
        }
        console.log(`Character ${character.getName()} regen HP +${regen}, Current HP: ${character.currentHP}/${character.maxHP}`);
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