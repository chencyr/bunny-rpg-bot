/**
 * Configuration for Mysql Database
 * @type {{connections: {game_core_master: {password: string, database: string, host: string, username: string}, game_core_replica: {password: string, database: string, host: string, username: string}}}}
 */
module.exports = {
    connections: {
        default: {
            database: process.env["GAME_ENGINE_DEFAULT_DB_HOST"],
            user: process.env["GAME_ENGINE_DEFAULT_DB_USER"],
            password: process.env["GAME_ENGINE_DEFAULT_DB_PWD"],
            host: process.env["GAME_ENGINE_DEFAULT_DB_HOST"],
        },
        replica: {
            database: process.env["GAME_ENGINE_REPLICA_DB_SCHEMA"],
            user: process.env["GAME_ENGINE_REPLICA_DB_USER"],
            password: process.env["GAME_ENGINE_REPLICA_DB_PWD"],
            host: process.env["GAME_ENGINE_REPLICA_DB_HOST"],
        },
    }
};