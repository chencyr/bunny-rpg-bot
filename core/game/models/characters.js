const Model = require('./model');
const Users = require('./users');

/**
 * Characters model class
 */
class Characters extends Model
{
    characters() {
        return this.manyToOne(Users, 'user_id');
    }
}

module.exports = Characters;
