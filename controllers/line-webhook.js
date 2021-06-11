const BaseController = require('./base.js');
const line = require('@line/bot-sdk');


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
            .all(req.body.events.map((event) => this.handleEvent(event)))
            .then((result) => res.json(result));
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    handleEvent(event) {
        console.log('received message:', event);
        if (event.type !== 'message' || event.message.type !== 'text') {
            return Promise.resolve(null);
        }

        if(event.message.text == '/leo') {
            return this.client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Leo HP最大值:${this.leo.maxHP} 目前HP:${this.leo.hp} 每秒恢復:${this.leo.recoverHP}`,
            });
        }

        if(event.message.text == '/attack leo' || event.message.text == '/打 leo' || event.message.text == '/攻擊 leo') {
            let damage = this.getRandomInt(1000);
            let beforeHP = this.leo.hp;
            this.leo.hp -= damage;

            if(this.leo.hp <= 0) {
                return this.client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: `Leo 受到 -${damage} HP 損傷!! 以死亡倒在地上抖動!! 你獲得經驗值 15562exp!!`,
                });
            }

            return this.client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
            });
        }

        if(event.message.text == '/heal leo' || event.message.text == '/治癒 leo' || event.message.text == '/治療 leo') {
            let damage = this.getRandomInt(100);
            let beforeHP = this.leo.hp;
            this.leo.hp += damage;

            return this.client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Leo 受到治療 +${damage} HP !! 恢復至 ${this.leo.hp}HP!!`,
            });
        }

        if(event.message.text == '/revive leo' || event.message.text == '/復活 leo') {

            this.leo.hp = this.leo.maxHP;

            return this.client.replyMessage(event.replyToken, {
                type: 'text',
                text: `Leo 已經死而復生，又是一條好漢!!`,
            });
        }

        if(event.message.text == '/flame-geyser leo' || event.message.text == '/烈焰斬 leo') {

            let damage = this.getRandomInt(3000);
            let beforeHP = this.leo.hp;
            this.leo.hp -= damage;

            if(this.leo.hp <= 0) {
                return this.client.replyMessage(event.replyToken, {
                    type: 'text',
                    text: `使用技能 [烈焰斬] !! Leo 受到 -${damage} HP 損傷!! 已死亡倒在地上抖動!! 你獲得經驗值 15562exp!!`,
                });
            }

            return this.client.replyMessage(event.replyToken, {
                type: 'text',
                text: `使用技能 [烈焰斬] !! Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
            });
        }

        if(event.message.text == '/explosion leo' || event.message.text == '/爆裂魔法 leo') {

            let damage = 9999999;
            let beforeHP = this.leo.hp;
            this.leo.hp -= damage;

            if(this.leo.hp <= 0) {
                return this.client.replyMessage(event.replyToken, [
                    {
                        type: 'text',
                        text: `使用技能 [爆裂魔法]`,
                    },
                    {
                        type: 'text',
                        text: `(吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion!!)`,
                    },
                    {
                        type: 'text',
                        text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
                    },
                ]);
            }
            else {
                return this.client.replyMessage(event.replyToken, [{
                    type: 'text',
                    text: `使用技能 [爆裂魔法]`,
                },{
                    type: 'text',
                    text: `(吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion!!)`,
                },{
                    type: 'text',
                    text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!!`,
                },
                ]);
            }
        }

        if(event.message.text == '/風鳥花月 leo') {

            let damage = 0;
            let beforeHP = this.leo.hp;
            this.leo.hp -= damage;

            return this.client.replyMessage(event.replyToken, [
                {
                    type: 'text',
                    text: `使用技能 [風鳥花月]`,
                },
                {
                    type: 'text',
                    text: `Leo 受到 -${damage} HP 損傷!! 剩下 ${this.leo.hp}HP!! 似乎沒什麼效果....`,
                },
                {
                    type: 'text',
                    text: `(Leo 覺得心情變好了!!)`,
                },
            ]);
        }


        // return this.client.replyMessage(event.replyToken, {
        //     type: 'text',
        //     text: event.message.text
        // });

        return Promise.resolve(null);
    }
}

module.exports = Controller;