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

        this.$connectionName = 'default';

        if(connectionName) {
            this.$connectionName = connectionName;
        }

        const handler = {
            get: function(target, name) {

                const queryBuilder = target.getQueryBuilder();
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

                return Reflect.get(queryBuilder, name);
            },
        };

        return new Proxy(this, handler);
    }

    /**
     * Get queryBuilder instance
     * @return {*}
     */
    getQueryBuilder() {
        if(!this.$queryBuilder) {
            const table = this.getTable();
            this.$queryBuilder = db[this.$connectionName](table);
        }

        return this.$queryBuilder;
    }

    /**
     * Create new queryBuilder.
     * @return {*}
     */
    newQueryBuilder() {
        const table = this.getTable();
        return db[this.$connectionName](table);
    }

    /**
     * Reset new queryBuilder
     * @return {Model}
     */
    resetQueryBuilder() {
        this.$queryBuilder = this.newQueryBuilder();
        return this;
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
     * @param many {Model} other orm
     * @param attribute {string} Attribute/field name
     * @return {*}
     */
    oneToMany(many, attribute) {
        const theTable = this.getTable();
        const primaryKey = this.getPrimaryKey();
        const relation = new many();
        const relationTable = relation.getTable();

        return this.join(`${relationTable}`, `${relationTable}.${attribute}`, `${theTable}.${primaryKey}`);
    }

    /**
     * Auto join by model relationship
     *
     * @param one {Model} Table name
     * @param attribute {string} Attribute/field name
     * @return {*}
     */
    manyToOne(one, attribute) {
        const theTable = this.getTable();
        const relation = new one();
        const relationTable = relation.getTable();
        const primaryKey = relation.getPrimaryKey();

        return this.join(`${relationTable}`, `${relationTable}.${primaryKey}`, `${theTable}.${attribute}`);
    }

    /**
     * Get a record by user id
     * @param id
     * @return {*}
     */
    getById(id) {
        const theTable = this.getTable();
        const primaryKey = this.getPrimaryKey();
        const condition = {};

        condition[`${theTable}.${primaryKey}`] = id;

        return this.getRecord(condition);
    }

    /**
     * Get a record by condition
     * @param condition {object}
     * @return {*}
     */
    async getRecord(condition) {
        return await this.newQueryBuilder().select('*')
            .where(condition)
            .limit(1)
            .offset(0);
    }

    /**
     * Get record or create new record.
     * @param condition
     * @return {Promise<void>}
     */
    async forceRecord(condition) {
        const isExist = await this.exist(condition);
        if (!isExist) {
            await this.newQueryBuilder().insert(condition);
        }

        return await this.getRecord(condition);
    }

    /**
     * Check record is exists
     * @param condition
     */
    async exist(condition) {
        const records = await this.getRecord(condition);
        return (records.length > 0);
    }

    /**
     * Create new record
     * @param record
     * @return {Promise<void>}
     */
    async create(record) {
        return this.newQueryBuilder().insert(record);
    }

    /**
     * Update record by id
     * @param id
     * @param record
     * @return {Promise<*>}
     */
    async updateById(id, record) {
        const theTable = this.getTable();
        const primaryKey = this.getPrimaryKey();
        const condition = {};

        condition[`${theTable}.${primaryKey}`] = id;

        return this.newQueryBuilder().where(condition).update(record);
    }
}

module.exports = Model;