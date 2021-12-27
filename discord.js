const { Client, Intents } = require('discord.js');

module.exports = function (app, EventFactory) {

    const config = app.config('discord');
    const factory = new EventFactory();
    const options = { gameEngine: app.gameEngine, app: app };

    const client = new Client({
        intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
    });

    async function handleMessage(message) {
        const cmdEvent = factory.createBotCmdAdapter(message, options);
        return await cmdEvent.trigger();
    }

    function isCommandText(text) {
        try {
            return (text.substring(0, 1) == '/');
        }
        catch (e) {
            return false;
        }
    }

    client.on("ready", () => {
        console.log("Discord Webhook was ready.");
    });

    client.on("messageCreate", (message) => {
        // console.log(message);

        if (message.content.startsWith("/凱文")) {
            message.channel.send("凱文又在亂把妹紙了!");
        }

        if (message.content.startsWith("/吠吠")) {
            message.channel.send("回歸大自然～");
        }

        if (message.content.startsWith("HI Bunny")) {
            message.channel.send("HI~HI~");
        }

        if (message.content.startsWith("跟助教一樣渣...")) {
            message.reply("但奶捲好像會用Vite打包妹ㄗ...到底誰比較渣...");
        }

        if(isCommandText(message.content)) {
            Promise.resolve(handleMessage(message)).then((result) => {
                if (result.notReply()) {
                    return null;
                }

                const messages = result.getMessages();
                if(messages) {
                    messages.forEach((msg) => {
                        if(msg.type == 'text') {
                            message.channel.send(msg.text);
                        }
                    });
                }
            });
        }

    });

    client.login(config.botToken);
};