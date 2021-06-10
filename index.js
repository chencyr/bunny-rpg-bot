// CommonJS
const line = require('@line/bot-sdk');


const config = {
    channelAccessToken: 'LYgx9c/11du19BXx6rQdj1Wv9FXDY2mtYrEyRT6+43K82n+dMQZ9jpHd46V0dQbRrisS/oVKWZ/fUjZtl5LXbliiRqWpV7y2qEFFfgIhaZN9DQ0TTVo0gMCpW/ZTxbUF9tdLh/k2AkffG4Pyj2RSvgdB04t89/1O/w1cDnyilFU=',
    channelSecret: '0ae36251c5000662f528b78c0fd318c0'
};

new line.Client(config);
line.middleware(config);