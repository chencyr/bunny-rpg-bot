const db = require('../system/databases');



class Users
{
    constructor(conn) {
        this.$connection = 'default';

        const table = this.getTable();
        conn = this.$connection;

        const handler = {
            get: function(target, name) {

                const _conn = db[conn](table);
                const prototype = target.constructor.prototype;
                const methods = Object.getOwnPropertyNames(prototype);

                if(methods.includes(name)) {
                    return Reflect.get(target, name);
                }

                if(target.hasOwnProperty(name)) {
                    return Reflect.get(target, name);
                }

                return Reflect.get(_conn, name);
            },
        };

        // return new Proxy(db[this.$connection](this.getTable()), handler);
        return new Proxy(this, handler);
    }

    getTable() {
        return 'users';
    }

}

const model = new Users();

async function getUserRecord(obj, id) {
    const result = await obj
        .select('*')
        // .characters()
        .where({id: id});

    console.log(result);
    return result;
}

getUserRecord(model, 5);


console.log('getTable', model.getTable());




module.exports = {};
