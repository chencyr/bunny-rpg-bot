const Model = require('./model');


/**
 * Characters users class
 */
class Users extends Model
{
    characters() {
        return this.oneToMany(require('./characters'), 'user_id');
    }
}

module.exports = Users;
