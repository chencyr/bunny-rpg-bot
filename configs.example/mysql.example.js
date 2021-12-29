/**
 * Configuration for Mysql Database
 * @type {{connections: {game_core_master: {password: string, database: string, host: string, username: string}, game_core_replica: {password: string, database: string, host: string, username: string}}}}
 */
module.exports = {
    connections: {
        default: {
            user: 'user',
            password: 'password',
            host: 'localhost',
            database: 'db',
        },
        replica: {
            user: 'user',
            password: 'password',
            host: 'localhost',
            database: 'db',
        },
    }
};