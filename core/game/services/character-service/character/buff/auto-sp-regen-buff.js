const StandardBuff = require('./standard-buff');

/**
 * AutoSpRegenBuff
 */
class AutoSpRegenBuff extends StandardBuff
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
        return "auto-sp-regen-buff";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "auto-sp-regen-buff",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return "SP 自然恢復"
    }

    /**
     * Effective
     */
    effect() {
        const character = this.getContext();
        const max = character.maxSP;
        const regen = Math.floor(character.maxSP * 0.03);

        if(max == character.currentSP) {
            return;
        }

        if(character.currentSP + regen > max) {
            character.currentSP = max;
        }
        else {
            character.currentSP += regen;
        }
        console.log(`Character ${character.getName()} regen SP +${regen}, Current SP: ${character.currentSP}/${character.maxSP}`);
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
        return 0;
    }
}

module.exports = AutoSpRegenBuff;