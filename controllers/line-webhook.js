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
    handleEvent(event, req, res) {
        console.log('received message:', event);
        console.log('received mention', event.message.mention);

        if (Controller.isAllowedEventObject(event)) {
            return Promise.resolve(null);
        }

        if (!Controller.isCommandText(event.message.text)) {
            return Promise.resolve(null);
        }

        const cmdEvent = this.eventFactory.createBotCmdAdapter(event);
        const result = cmdEvent.trigger();

        if (result.hasException()) {
            return Promise.resolve(null);
        }

        return this.client.replyMessage(event.replyToken, result.getMessages());

        // if(event.message.text == '/leo') {
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo HP最大值:${this.leo.maxHP} 目前HP:${this.leo.hp} 每秒恢復:${this.leo.recoverHP}`,
        //     });
        // }
        //
        // if(event.message.text == '/attack leo' || event.message.text == '/打 leo' || event.message.text == '/攻擊 leo') {
        //     let damage = this.getRandomInt(1000);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //
        //     if(this.leo.hp <= 0) {
        //         return this.client.replyMessage(event.replyToken, {
        //             type: 'text',
        //             text: `Leo 受到 -${damage} HP 損傷!! 以死亡倒在地上抖動!! 你獲得經驗值 15562exp!!`,
        //         });
        //     }
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/heal leo' || event.message.text == '/治癒 leo' || event.message.text == '/治療 leo') {
        //     let damage = this.getRandomInt(100);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp += damage;
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo 受到治療 +${damage} HP !! 恢復至 ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/revive leo' || event.message.text == '/復活 leo') {
        //
        //     this.leo.hp = this.leo.maxHP;
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `Leo 已經死而復生，又是一條好漢!!`,
        //     });
        // }
        //
        // if(event.message.text == '/flame-geyser leo' || event.message.text == '/烈焰斬 leo') {
        //
        //     let damage = this.getRandomInt(3000);
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //
        //     if(this.leo.hp <= 0) {
        //         return this.client.replyMessage(event.replyToken, {
        //             type: 'text',
        //             text: `使用技能 [烈焰斬] !! Leo 受到 -${damage} HP 損傷!! 已死亡倒在地上抖動!! 你獲得經驗值 15562exp!!`,
        //         });
        //     }
        //
        //     return this.client.replyMessage(event.replyToken, {
        //         type: 'text',
        //         text: `使用技能 [烈焰斬] !! Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
        //     });
        // }
        //
        // if(event.message.text == '/explosion leo' || event.message.text == '/爆裂魔法 leo') {
        //
        //     let damage = 9999999;
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //     let host = req.get('host');
        //
        //     let messages = [
        //         {
        //             type: 'text',
        //             text: `使用技能 [爆裂魔法] \n(吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion!!)`,
        //         },
        //         {
        //             type: 'text',
        //             text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!! `,
        //         },
        //     ];
        //
        //     if(this.leo.hp <= 0) {
        //         messages.push({
        //             type: 'text',
        //             text: `Leo 已死亡倒在地上抖動!! 你獲得經驗值 15562 exp!!`,
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
        // if(event.message.text == '/風鳥花月 leo') {
        //
        //     let damage = 0;
        //     let beforeHP = this.leo.hp;
        //     this.leo.hp -= damage;
        //     let host = req.get('host');
        //
        //     let messages = [
        //         {
        //             type: 'text',
        //             text: `使用技能 [風鳥花月]`,
        //         },
        //         {
        //             type: 'text',
        //             text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!! `,
        //         },
        //         {
        //             type: 'text',
        //             text: `(Leo 覺得心情變好了!!)`,
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