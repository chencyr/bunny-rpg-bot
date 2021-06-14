const Model = require('./model');
const Characters = require('./characters');

/**
 * Characters users class
 */
class Users extends Model
{
    characters() {
        return this.oneToMany(Characters, 'user_id');
    }
}

module.exports = Users;
