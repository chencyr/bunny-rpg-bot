

/**
 * Soul base class
 *
 */
class Soul
{
    /**
     * Constructor
     */
    constructor() {
        this.character = null;
    }

    /**
     * Set character as body
     * @param character {Character}
     */
    setCharacter(character) {
        this.character = character;
    }
}

module.exports = Soul;