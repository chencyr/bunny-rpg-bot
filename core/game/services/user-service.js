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
     * @param data
     */
    async has(data) {
        data = data || {};

        if (!data.userId) {
            throw new Error('UserService error: Missing required property [userId] of args');
        }

        const condition = { id: data.userId };
        return await this.userModel().exist(condition);
    }
}


module.exports = UserService;
