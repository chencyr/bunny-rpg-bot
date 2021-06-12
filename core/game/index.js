/**
 * Game engine
 *
 */
class Engine {

    /**
     * Constructor
     *
     * @param context application context.
     */
    constructor(context) {
        this.context = context;
        this.bootstrap();
    }

    /**
     * Startup engine.
     */
    bootstrap()
    {
        // Load actions.
        this.$actions = {};

        const normalizedPath = require("path").join(__dirname, "action");
        require("fs").readdirSync(normalizedPath).forEach((file) => {
            const Action = require("./action/" + file);
            const action = new Action(this);

            action.getNames().forEach((name) => {
                if(this.$actions[name]) {
                    throw new Error(`Duplicate action name [${name}] loading error.`);
                }
                this.$actions[name] = action;
            });

            console.info(`GameEngine: action [${action.getId()}] loaded.`);
        });
    }

    /**
     * Get action instance by action name.
     * @param name
     */
    getAction(name) {
        if (this.$actions[name]) {
            return this.$actions[name];
        }

        throw new Error(`Cannot get action [${name}], action not found error.`);
    }

    /**
     * Process action.
     *
     * @param action
     * @param actor
     * @param to
     * @return {object}
     */
    action(action, actor, to) {
        const returnMsg = this
            .getAction(action.name)
            .exec(actor, to, action.args)
            .getMessages();

        const returnObj = {messages: returnMsg};
        console.debug('GameEngine: action return: ', returnObj);

        return returnObj;
    }
}


module.exports = Engine;