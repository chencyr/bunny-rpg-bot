const Model = require('./model');

class Users extends Model
{
    characters() {
        return this.oneToMany('characters', 'user_id');
    }

    get yo() {
        return 'yo'
    }
}

const model = new Users();

async function getUserRecord(obj, id) {
    const result = await obj
        // .join('characters', 'characters.user_id', 'users.id')
        .characters()
        .select('users.id')
        .where('characters.user_id', '=' , id);

    console.log(result);
    return result;
}

getUserRecord(model, 5);


console.log('getTable', model.getTable());
console.log('yo', model.yo);




module.exports = Users;
