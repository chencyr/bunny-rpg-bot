/**
 * Configuration for Mysql Database
 * @type {{connections: {game_core_master: {password: string, database: string, host: string, username: string}, game_core_replica: {password: string, database: string, host: string, username: string}}}}
 */
module.exports = {
    connections: {
        default: {
            user: 'user_',
            password: 'password_',
            host: 'localhost_',
            database: 'db_',
        },
        replica: {
            user: 'user_',
            password: 'password_',
            host: 'localhost_',
            database: 'db_',
        },
    }
};