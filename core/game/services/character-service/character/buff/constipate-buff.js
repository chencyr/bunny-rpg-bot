const StandardBuff = require('./standard-buff');

/**
 * Constipate
 */
class Constipate extends StandardBuff
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
        return "constipate";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "constipate",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `便秘 (${(this.getEffectTime()/1000) - this.timer}s)`
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
        return 1000 * 10;
    }

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return (this.character.str * 10);
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return -(this.character.vit * 10);
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
        return -(this.character.agi * 10);
    }

    /**
     * Getter for int
     * @return {number}
     */
    get int() {
        return -(this.character.int * 10);
    }

    /**
     * Getter for int
     * @return {number}
     */
    get luk() {
        return (this.character.luk * 10);
    }
}

module.exports = Constipate;