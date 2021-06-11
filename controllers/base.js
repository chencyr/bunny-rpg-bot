
/**
 * Controller base class
 */
class BaseController {

    /**
     * Constructor
     *
     * @param app
     * @return {BaseController}
     */
    constructor(app) {
        this.app = app;
        return this;
    }

    /**
     * Get config from app DI.
     *
     * @param name
     * @return {*}
     */
    appConfig(name) {
        return this.app.config(name);
    }
}

module.exports = BaseController;