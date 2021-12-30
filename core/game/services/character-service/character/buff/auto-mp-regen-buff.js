const StandardBuff = require('./standard-buff');

/**
 * AutoMpRegenBuff
 */
class AutoMpRegenBuff extends StandardBuff
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
        return "auto-mp-regen-buff";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "auto-mp-regen-buff",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return "MP 自然恢復"
    }

    /**
     * Effective
     */
    effect() {
        const character = this.getContext();
        const max = character.maxMP;
        const regen = Math.floor(character.maxMP * 0.03);

        if(max == character.currentMP) {
            return;
        }

        if(character.currentMP + regen > max) {
            character.currentMP = max;
        }
        else {
            character.currentMP += regen;
        }
        console.log(`Character ${character.getName()} regen MP +${regen}, Current MP: ${character.currentMP}/${character.maxMP}`);
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

module.exports = AutoMpRegenBuff;