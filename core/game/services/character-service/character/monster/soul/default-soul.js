const Soul = require('./');

/**
 * DefaultSoul base class
 *
 */
class DefaultSoul
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

module.exports = DefaultSoul;