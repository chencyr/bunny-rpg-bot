const Model = require('./model');


/**
 * Characters model class
 */
class Characters extends Model
{
    users() {
        return this.manyToOne(require('./users'), 'user_id');
    }

    skills() {
        // Many to Many
        // return this.manyToOne(require('./users'), 'user_id');
        return this
            .join('character_has_skill', 'character_has_skill.character_id', 'characters.id')
            .join('skills', 'skills.id', 'character_has_skill.skill_id')


    }
}

module.exports = Characters;
