require('dotenv').config();

/**
 * Configuration for Discord applications
 *
 * @type {{applicationID: string, botToken: string}}
 */
module.exports = {
    host: process.env["APP_HOST"],
};