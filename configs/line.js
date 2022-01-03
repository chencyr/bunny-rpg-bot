require('dotenv').config();

/**
 * Configuration for LINE applications.
 *
 * @type {{clientID: string, channelAccessToken: string, channelSecret: string}}
 */
module.exports = {
    channelAccessToken: process.env["LINE_CHANNEL_ACCESS_TOKEN"],
    channelSecret: process.env["LINE_CHANNEL_ACCESS_SECRET"],
    clientID: process.env["LINE_CHANNEL_CLIENT_ID"],
};