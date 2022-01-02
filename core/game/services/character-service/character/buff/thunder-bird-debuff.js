const StandardBuff = require('./standard-buff');

// TODO refactor load by DI
const random = require('../../../../helpers/ramdon-key-from-object');

/**
 * ThunderBird
 */
class ThunderBird extends StandardBuff
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
        return "thunder-bird";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "thunder-bird",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `雷神鳥胃的詛咒 (${(this.getEffectTime()/1000) - this.timer}s)`
    }

    /**
     * Buff up
     * @param options
     */
    up(options) {
        this.deBuffStatusProperties = this.randomChangeOneProperty(
            this.getDefaultDebBuffStatusProperties(),
            this.getDeBuffValue()
        );
    }

    /**
     * Get de-buff value.
     * @return {number}
     */
    getDeBuffValue() {
        return -500;
    }

    /**
     * Random set a value into object item
     * @param deBuffStatusProperties
     * @param value
     * @return {*}
     */
    randomChangeOneProperty(deBuffStatusProperties, value) {
        const key = random(deBuffStatusProperties);
        deBuffStatusProperties[key] = value;

        return deBuffStatusProperties;
    }

    /**
     * Get default status structure object
     * @return {{str: number, vit: number, agi: number, luk: number, dex: number, int: number}}
     */
    getDefaultDebBuffStatusProperties() {
        return {
            str: 0,
            vit: 0,
            agi: 0,
        };
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
        return 1000 * 60 * 5;
    }

    /**
     * Getter for str
     * @return {number}
     */
    get str() {
        return this.deBuffStatusProperties.str;
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return this.deBuffStatusProperties.vit;
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
        return this.deBuffStatusProperties.agi;
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

module.exports = ThunderBird;