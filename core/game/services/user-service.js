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

    /**
     * Check engine has user.
     * @param data
     */
    async has(data) {
        data = data || {};
        if (data.userType != 'line') {
            throw new Error('UserService error: Invalid property [userType] of args');
        }

        if (!data.userId) {
            throw new Error('UserService error: Missing required property [userId] of args');
        }

        const userModel = this.context.createModel('users');
        const result = await userModel
            .where('line_id', '=' , data.userId)
            .limit(1)
            .offset(0);

        return (result.length > 0);
    }
}


module.exports = UserService;
