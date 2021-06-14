const Model = require('./model');

class Users extends Model
{
    characters() {
        return this.oneToMany('characters', 'user_id');
    }
}

module.exports = Users;
