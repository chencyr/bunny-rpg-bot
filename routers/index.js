



/**
 * Main service router
 *
 * @param app {{express}}
 */
module.exports = function(app) {

    const AuthController = app.controller('auth');

    app.get('/register', AuthController.register);

};