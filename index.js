// CommonJS
const express = require('express');
// var fs = require('fs');
// var sys = require('sys');
const line = require('@line/bot-sdk');


const config = {
    channelAccessToken: 'LYgx9c/11du19BXx6rQdj1Wv9FXDY2mtYrEyRT6+43K82n+dMQZ9jpHd46V0dQbRrisS/oVKWZ/fUjZtl5LXbliiRqWpV7y2qEFFfgIhaZN9DQ0TTVo0gMCpW/ZTxbUF9tdLh/k2AkffG4Pyj2RSvgdB04t89/1O/w1cDnyilFU=',
    channelSecret: '0ae36251c5000662f528b78c0fd318c0'
};

// new line.Client(config);
// line.middleware(config);


const app = express();
app.set("view options", {layout: false});
app.use('/static', express.static(__dirname + '/static'));


app.get('/', function(req, res){
    res.send('Service Available!');
});

app.post('/webhook', line.middleware(config), (req, res) => {
    Promise
        .all(req.body.events.map(handleEvent))
        .then((result) => res.json(result));
});


const client = new line.Client(config);
function handleEvent(event) {
    console.log('received message:', event);
    if (event.type !== 'message' || event.message.type !== 'text') {
        return Promise.resolve(null);
    }

    if(event.message.text == '/註冊') {

    }

    if(event.message.text == '/register') {

    }

    return client.replyMessage(event.replyToken, {
        type: 'text',
        text: event.message.text
    });

    return Promise.resolve(null);
}

app.listen(3000);