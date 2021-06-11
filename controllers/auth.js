
const BaseController = require('./base.js');

/**
 *
 */
class AuthController extends BaseController {

    /**
     * Constructor
     *
     * @param app
     * @return {AuthController}
     */
    constructor(app) {
        return super(app);
    }

    /**
     * Register new user page.
     * @param req
     * @param res
     */
    register(req, res) {
        const lineConfig = this.appConfig('line');
        res.render('register', {
            client_id: lineConfig.clientID,
        });
    }
}

module.exports = AuthController;