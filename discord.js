const { Client, Intents } = require('discord.js');


/**
 * Create new discord client instance.
 *
 * @return {module.exports.Client|Client<boolean>}
 */
function getClient() {
    return new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });
}

/**
 * Create validator for check first word.
 *
 * @param keyword
 * @return {Function}
 */
function firstWordIs(keyword) {
    return (text) => {
        try {
            return (text.substring(0, 1) == keyword);
        }
        catch (e) {
            return false;
        }
    }
}

/**
 * Create game engine adapter.
 *
 * @param factory
 * @param app
 * @return {function(*=)}
 */
function gameCommandAdapter(factory, app) {
    return async (message) => {
        const options = { gameEngine: app.gameEngine, app: app };
        const cmdEvent = factory.createBotCmdAdapter(message, options);
        return await cmdEvent.trigger();
    }
}

/**
 * Reply message
 *
 * @param message
 * @return {Function}
 */
function replyMessage(message) {
    return (result) => {
        if (result.notReply()) {
            return null;
        }

        const resultMessages = result.getMessages();
        if(!resultMessages) {
            return null;
        }

        resultMessages.forEach((result) => {
            if(result.type == 'text') {
                message.reply(result.text);
            }
        });
    }
}

/**
 * Dispatch message data by game-engine command
 *
 * @param validator Function creator
 * @param dispatcher Function creator
 * @param replyMessage Function creator
 * @return {Function}
 */
function dispatchMessage(validator, dispatcher, replyMessage) {
    return (message) => {
        if(!validator(message.content)) {
            return;
        }

        Promise
            .resolve(dispatcher(message))
            .then(replyMessage(message));
    };
}

/**
 * Bootstrap discord webhook.
 *
 * @param app {gameEngine}
 * @param EventFactory
 */
function bootstrap(app, EventFactory) {
    const config = app.config('discord');
    const factory = new EventFactory();
    const client = getClient();

    client.on("ready", () => {
        console.log("Discord Webhook was ready.");
    });

    client.on("messageCreate", dispatchMessage(
        firstWordIs(":"),
        gameCommandAdapter(factory, app),
        replyMessage
    ));

    client.login(config.botToken);
}

module.exports = bootstrap;