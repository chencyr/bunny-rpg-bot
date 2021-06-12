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
     * Process action.
     *
     * @param action
     * @param actor
     * @param to
     */
    action(action, actor, to) {
        console.log();
        result.messages = [];
    }
}


module.exports = Engine;