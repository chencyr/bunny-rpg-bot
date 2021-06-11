



/**
 * Main service router
 *
 * @param app {{express}}
 */
module.exports = function(app) {

    const IndexController = app.controller('index-controller');
    const AuthController = app.controller('auth');
    const LineWebhookController = app.controller('line-webhook');

    const lineConfig = app.config('line');
    const line = require('@line/bot-sdk');

    app.get('/', IndexController.index);
    app.get('/register', AuthController.register);
    app.post('/webhook/line', line.middleware(lineConfig), LineWebhookController.received);
};