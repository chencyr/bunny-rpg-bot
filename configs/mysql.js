/**
 * Configuration for Mysql Database
 * @type {{connections: {game_core_master: {password: string, database: string, host: string, username: string}, game_core_replica: {password: string, database: string, host: string, username: string}}}}
 */
module.exports = {
    connections: {
        default: {
            user: 'b25e803b6fc50b',
            password: 'f16c16ed',
            host: 'us-cdbr-east-04.cleardb.com',
            database: 'heroku_f0392c0473d3f0f',
        },
        replica: {
            user: 'b25e803b6fc50b',
            password: 'f16c16ed',
            host: 'us-cdbr-east-04.cleardb.com',
            database: 'heroku_f0392c0473d3f0f',
        },
    }
};