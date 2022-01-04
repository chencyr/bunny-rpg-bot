require('dotenv').config();

/**
 * Configuration for Discord applications
 *
 * @type {{applicationID: string, botToken: string}}
 */
module.exports = {
    host: process.env["APP_HOST"],
    heartbeat: process.env["APP_HEARTBEAT_INTERVAL"],
    sleepStart: process.env["APP_SLEEP_START"],
    sleepEnd: process.env["APP_SLEEP_END"],
};