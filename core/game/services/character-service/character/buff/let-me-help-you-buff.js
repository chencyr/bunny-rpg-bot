const StandardBuff = require('./standard-buff');

/**
 * LetMeHelpYou
 */
class LetMeHelpYou extends StandardBuff
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
        return "let-me-help-you";
    }

    /**
     * Get buff alias names
     * @return {Array}
     */
    getNames() {
        return [
            "let me help you",
            "let-me-help-you",
            "Let me help you",
            "讓我幫邦尼",
            "讓我幫幫尼",
            "讓我幫幫你",
            "幫尼",
            "邦尼",
            "幫你",
        ];
    }

    /**
     * Get buff name
     *
     * @return {string}
     */
    getDisplayName() {
        return `讓我幫邦尼 (${(this.getEffectTime()/1000) - this.timer}s)`
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
        const max = character.maxSP;
        const regen = Math.floor(character.maxSP * 0.1);

        if(max == character.currentSP) {
            return;
        }

        if(character.currentSP + regen > max) {
            character.currentSP = max;
        }
        else {
            character.currentSP += regen;
        }
        console.log(`[${this.getDisplayName()}] Character ${character.getName()} regen MP +${regen}, Current MP: ${character.currentSP}/${max}`);
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
        return 500;
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
        return 300;
    }
}

module.exports = LetMeHelpYou;