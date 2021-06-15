const Model = require('./model');


/**
 * Characters model class
 */
class Characters extends Model
{
    users() {
        return this.manyToOne(require('./users'), 'user_id');
    }
}

module.exports = Characters;
