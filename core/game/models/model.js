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
        this.$oneToMany = {};

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
        if(!this.$connection) {
            const table = this.getTable();
            this.$connection = db[this.$conntionName](table);
        }

        return this.$connection;
    }

    /**
     * Define table name.
     * @return {string}
     */
    getTable() {
        if(!this.$table) {
            this.$table = this.constructor.name.toLowerCase();
        }

        return this.$table;
    }

    /**
     * Define table primary key attribute name.
     * @return {string}
     */
    getPrimaryKey() {
        return "id";
    }

    /**
     * Auto join by model relationship
     *
     * @param many {string} Table name
     * @param attribute {string} Attribute/field name
     * @return {*}
     */
    oneToMany(many, attribute) {
        if (!this.$oneToMany[many]) {
            const theTable = this.getTable();
            const primaryKey = this.getPrimaryKey();

            const fn = () => {
                return this.join(`${many}`, `${many}.${attribute}`, `${theTable}.${primaryKey}`);
            };

            this.$oneToMany[many] = fn;
        }

        return this.$oneToMany[many]();
    }
}

module.exports = Model;