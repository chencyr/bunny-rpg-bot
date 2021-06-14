/**
 * User service, service should run as singleton.
 */
class UserService
{
    /**
     * Constructor
     * @param context {GameEngine}
     */
    constructor(context) {
        this.context = context;
    }

    getName() {
        return 'user-service';
    }

}


module.exports = UserService;
