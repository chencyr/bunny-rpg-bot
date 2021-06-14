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

    /**
     * Create user model instance.
     * @return {Users}
     */
    userModel() {
        return this.context.createModel('users');
    }

    /**
     * Check engine has user.
     * @param id {int} User ID
     */
    async has(id) {
        const condition = { id: id };
        return await this.userModel().exist(condition);
    }
}


module.exports = UserService;
