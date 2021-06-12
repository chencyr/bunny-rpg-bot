const Player = require('./character/player/player');

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
        this.loadActions();
        this.initObjectPool();
    }

    /**
     * Load actions
     */
    loadActions() {
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
     * Init game objects pool.
     */
    initObjectPool() {
        this.$object = {
            character: {},
        };
    }

    /**
     * Get game object
     * @param type
     * @param find {object} if is array will use first object
     * @return {*}
     */
    getObject(type, find) {

        let object = find;
        if (Array.isArray(find)) {
            object = find[0];
        }

        if (object.userId) {
            const pool = this.$object[type];
            if (pool[object.userId]) {
                return pool[object.userId];
            }
        }

        throw new Error(`Cannot find [${type}] object from input: ` + JSON.stringify(object));
    }

    /**
     *
     * @param type
     * @param find
     * @return {*}
     */
    hasObject(type, find) {
        let object = find;
        if (Array.isArray(find)) {
            object = find[0];
        }

        if (object.userId) {
            const pool = this.$object[type];
            if (pool[object.userId]) {
                return true;
            }
            else {
                return false;
            }
        }

        throw new Error(`Cannot find [${type}] object from input: ` + JSON.stringify(object));
    }

    newCharacter(data) {
        if (this.$object.character[data.userId]) {
            throw new Error('User already created character error.');
        }

        const character = new Player(data);
        this.$object.character[data.userId] = character;
        return {
            isSuccess: true,
            characterName: data.name,
        };
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