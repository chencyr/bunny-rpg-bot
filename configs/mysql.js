require('dotenv').config();

/**
 * Configuration for Mysql Database
 * @type {{connections: {game_core_master: {password: string, database: string, host: string, username: string}, game_core_replica: {password: string, database: string, host: string, username: string}}}}
 */
module.exports = {
    connections: {
        default: {
            database: process.env["APP_DEFAULT_DB_SCHEMA"],
            user: process.env["APP_DEFAULT_DB_USER"],
            password: process.env["APP_DEFAULT_DB_PWD"],
            host: process.env["APP_DEFAULT_DB_HOST"],
        },
        replica: {
            database: process.env["APP_REPLICA_DB_SCHEMA"],
            user: process.env["APP_REPLICA_DB_USER"],
            password: process.env["APP_REPLICA_DB_PWD"],
            host: process.env["APP_REPLICA_DB_HOST"],
        },
    }
};