const Model = require('./model');


/**
 * Skills model class
 */
class Skills extends Model
{
    characters() {
        // Many to Many
        // return this.manyToOne(require('./users'), 'user_id');
        return this
            .join('character_has_skill', 'character_has_skill.skill_id', 'skills.id')
            .join('characters', 'characters.id', 'character_has_skill.character_id');

    }
}

module.exports = Skills;
