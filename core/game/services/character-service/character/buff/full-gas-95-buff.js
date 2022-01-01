const StandardBuff = require('./standard-buff');

/**
 * FullGas95
 */
class FullGas95 extends StandardBuff
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
        return "full-gas-95";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "full-gas-95",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `95加滿 (${(this.getEffectTime()/1000) - this.timer}s)`
    }

    /**
     * Buff up
     * @param options
     */
    up(options) {

    }

    /**
     * Buff down
     * @param options
     */
    down(options) {

    }

    /**
     * Effective
     */
    effect() {
        const character = this.getContext();
        const max = character.maxHP;
        const regen = Math.floor(max * 0.2);

        if(max == character.currentHP) {
            return;
        }

        if(character.currentHP + regen > max) {
            character.currentHP = max;
        }
        else {
            character.currentHP += regen;
        }
        console.log(`[${this.getDisplayName()}] Character ${character.getName()} regen Hp +${regen}, Current HP: ${character.currentHP}/${max}`);
    }

    /**
     * Define buff frequency
     *
     * @return {number} ms
     */
    getFrequency() {
        return 1000 * 1;
    }

    /**
     * Define buff effect time
     *
     * @return {number} ms, if time = 0 forever
     */
    getEffectTime() {
        return 1000 * 60 * 3;
    }

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return -(this.context.statusProperty('str') * 0.5);
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return (this.context.statusProperty('vit') * 2);
    }

    /**
     * Getter for str
     * @return {number}
     */
    get dex() {
        return 0;
    }

    /**
     * Getter for agi
     * @return {number}
     */
    get agi() {
        return 0;
    }

    /**
     * Getter for int
     * @return {number}
     */
    get int() {
        return 0;
    }

    /**
     * Getter for int
     * @return {number}
     */
    get luk() {
        return 0;
    }
}

module.exports = FullGas95;