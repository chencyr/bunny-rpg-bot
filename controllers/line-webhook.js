const BaseController = require('./base.js');
const line = require('@line/bot-sdk');
const EventFactory = require(global.path.app + '/core/events/event-factory/line-factory');


/**
 *
 */
class Controller extends BaseController {

    /**
     * Constructor
     *
     * @param app
     * @return {Controller}
     */
    constructor(app) {
        super(app);

        this.eventFactory = new EventFactory();

        const config = this.appConfig('line');
        this.client = new line.Client(config);


        this.leo = {
            hp: 1500,
            maxHP: 1500,
            recoverHP: 10,
        };

        setInterval(() => {
            if(this.leo.hp <= this.leo.maxHP) {
                this.leo.hp += this.leo.recoverHP
            }
        }, 10000);

        return this;
    }

    /**
     * Register new user page.
     * @param req
     * @param res
     */
    received(req, res) {
        Promise
            .all(req.body.events.map((event) => this.handleEvent(event, req, res)))
            .then((result) => res.json(result));
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    /**
     * Check text content is command format.
     *
     * @param text {string}
     * @return {boolean}
     */
    static isCommandText(text) {
        try {
            return (text.substring(0, 1) == '/');
        }
        catch (e) {
            return false;
        }
    }

    /**
     * Check event object is allowed.
     *
     * @param event {object} LINE event object.
     * @return {boolean}
     */
    static isAllowedEventObject(event) {
        try {
            return (event.type !== 'message' || event.message.type !== 'text');
        }
        catch (e) {
            return false;
        }
    }


    /**
     * Reformat & forward LINE event object to command/game system.
     * And replay result, logging history, emit global events.
     *
     * @param event
     * @param req
     * @param res
     * @return {*}
     */
    async handleEvent(event, req, res) {
        try {
            console.info('LineWebhook: received message:', event);
            console.info('LineWebhook: received mention', event.message.mention);

            if (Controller.isAllowedEventObject(event)) {
                return null;
            }

            if (!Controller.isCommandText(event.message.text)) {
                return null;
            }

            const options = { gameEngine: this.app.gameEngine, app: this.app };
            const cmdEvent = this.eventFactory.createBotCmdAdapter(event, options);

            const result = await cmdEvent.trigger();
            if (result.notReply()) {
                return null;
            }

            const returnMessages = result.getMessages();

            console.info('LineWebhook: reply messages:', returnMessages);
            return await this.client.replyMessage(event.replyToken, returnMessages);
        }
        catch (e) {
            console.error('LineWebhook:', e);
            return null;
        }




        // if(event.message.text == '/attack leo' || event.message.text == '/??? leo' || event.message.text == '/?????? leo') {
        //     let damage = this.getRandomInt(1000);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //
        //     if(this.leo.hp <= 0) {
        //         return this.client.replyMessage(event.replyToken, {
        //             type: 'text',
        //             text: `Leo ?????? -${damage} HP ??????!! ???????????????????????????!! ?????????????????? 15562exp!!`,
        //         });
        //     }
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo ?????? -${damage} HP ??????!! ?????? ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/heal leo' || event.message.text == '/?????? leo' || event.message.text == '/?????? leo') {
        //     let damage = this.getRandomInt(100);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp += damage;
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo ???????????? +${damage} HP !! ????????? ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/revive leo' || event.message.text == '/?????? leo') {
        //
        //     this.leo.hp = this.leo.maxHP;
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo ???????????????????????????????????????!!`,
        //     });
        // }
        //
        // if(event.message.text == '/flame-geyser leo' || event.message.text == '/????????? leo') {
        //
        //     let damage = this.getRandomInt(3000);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //
        //     if(this.leo.hp <= 0) {
        //         return this.client.replyMessage(event.replyToken, {
        //             type: 'text',
        //             text: `???????????? [?????????] !! Leo ?????? -${damage} HP ??????!! ???????????????????????????!! ?????????????????? 15562exp!!`,
        //         });
        //     }
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `???????????? [?????????] !! Leo ?????? -${damage} HP ??????!! ?????? ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/explosion leo' || event.message.text == '/???????????? leo') {
        //
        //     let damage = 9999999;
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //     let host = req.get('host');
        //
        //     let messages = [
        //         {
        //             type: 'text',
        //             text: `???????????? [????????????] \n(????????????????????????????????????????????????????????????????????????????????????????????????????????????Explosion!!)`,
        //         },
        //         {
        //             type: 'text',
        //             text: `Leo ?????? -${damage} HP ??????!! ?????? ${this.leo.hp}HP!! `,
        //         },
        //     ];
        //
        //     if(this.leo.hp <= 0) {
        //         messages.push({
        //             type: 'text',
        //             text: `Leo ???????????????????????????!! ?????????????????? 15562 exp!!`,
        //         });
        //
        //     }
        //
        //     messages.push({
        //         type: "image",
        //         originalContentUrl: `https://${host}/statics/skill-explosion.png`,
        //         previewImageUrl: `https://${host}/statics/skill-explosion.png`,
        //         animated: true
        //     });
        //
        //     return this.client.replyMessage(event.replyToken, messages);
        // }
        //
        // if(event.message.text == '/???????????? leo') {
        //
        //     let damage = 0;
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //     let host = req.get('host');
        //
        //     let messages = [
        //         {
        //             type: 'text',
        //             text: `???????????? [????????????]`,
        //         },
        //         {
        //             type: 'text',
        //             text: `Leo ?????? -${damage} HP ??????!! ?????? ${this.leo.hp}HP!! `,
        //         },
        //         {
        //             type: 'text',
        //             text: `(Leo ?????????????????????!!)`,
        //         },
        //         {
        //             type: "image",
        //             originalContentUrl: `https://${host}/statics/skill-flower-moon.jpg`,
        //             previewImageUrl: `https://${host}/statics/skill-flower-moon.jpg`,
        //             animated: true
        //         },
        //     ];
        //
        //     return this.client.replyMessage(event.replyToken, messages);
        // }
        //
        // if(event.message.text == '/img') {
        //
        //     let damage = 0;
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //
        //     let host = req.get('host');
        //     console.log(host);
        //
        //     return this.client.replyMessage(event.replyToken, []);
        // }


        // return this.client.replyMessage(event.replyToken, {
        //     type: 'text',
        //     text: event.message.text
        // });

        return Promise.resolve(null);
    }
}

module.exports = Controller;