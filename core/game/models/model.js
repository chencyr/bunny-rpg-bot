const db = require('../system/databases');

/**
 * Base Model class
 */
class Model
{
    /**
     * Constructor
     * @param connectionName connection name from database config.
     * @return {Model}
     */
    constructor(connectionName) {

        this.$conntionName = 'default';
        if(connectionName) {
            this.$conntionName = connectionName;
        }

        const handler = {
            get: function(target, name) {

                const connection = target.getConnection();
                const prototype = target.constructor.prototype;

                let methods = Object.getOwnPropertyNames(prototype);
                if(methods.includes(name)) {
                    return Reflect.get(target, name);
                }

                methods = Object.getOwnPropertyNames(Model.prototype);
                if(methods.includes(name)) {
                    return Reflect.get(Model.prototype, name);
                }

                if(target.hasOwnProperty(name)) {
                    return Reflect.get(target, name);
                }

                return Reflect.get(connection, name);
            },
        };

        return new Proxy(this, handler);
    }

    /**
     * Get connection instance
     * @return {*}
     */
    getConnection() {
        const table = this.getTable();
        if(!this.$connection) {
            this.$connection = db[this.$conntionName](table);
        }

        return this.$connection;
    }

    /**
     * Define table name.
     * @return {string}
     */
    getTable() {

        return 'users';
    }
}

module.exports = Model;