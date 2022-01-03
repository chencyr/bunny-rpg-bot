require('dotenv').config();

/**
 * Configuration for Discord applications
 *
 * @type {{applicationID: string, botToken: string}}
 */
module.exports = {
    botToken: process.env["DISCORD_BOT_TOKEN"],
    applicationID: process.env["DISCORD_BOT_APP_ID"],
};