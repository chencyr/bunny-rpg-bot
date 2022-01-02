const StandardBuff = require('./standard-buff');

/**
 * ShitOnYou
 */
class ShitOnYou extends StandardBuff
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
        return "shit-on-you";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "shit-on-you",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `你身上有雞屎 (${(this.getEffectTime()/1000) - this.timer}s)`
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
        if(character.currentHP === 1) {
            return;
        }

        const max = character.maxHP;
        let damage = Math.floor(max * 0.1);

        if(damage > 5000) {
            damage = 5000;
        }

        if(character.currentHP - damage < 0) {
            character.currentHP = 1;
        }
        else {
            character.currentHP -= damage;
        }
        console.log(`[${this.getDisplayName()}] => [${this.getDisplayName()}] Character ${character.getName()} damage MP +${damage}, Current HP: ${character.currentHP}/${max}`);
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
        return 0;
    }

    /**
     * Getter for vit
     * @return {number}
     */
    get vit() {
        return 0;
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

module.exports = ShitOnYou;