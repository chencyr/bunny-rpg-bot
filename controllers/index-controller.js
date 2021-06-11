
const BaseController = require('./base.js');

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
        return super(app);
    }

    /**
     * Index page
     * @param req
     * @param res
     */
    index(req, res) {
        res.send('Service Available!');
    }
}

module.exports = Controller;