const Player = require('./character/player/player');
const path = require("path");

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
        this.initObjectPool();
        this.initEngineModules();
    }

    initEngineModules() {
        console.info(`GameEngine: InitEngineModule: Init...`);
        
        this.$const = {};
        this.$const.model = 'models';
        this.$const.action = 'actions';
        this.loadActions();
        this.loadModels();
        
        console.info(`GameEngine: InitEngineModule: Finished`);
    }
    
    /**
     * General module loader for load & inject engines module/service into module pool
     * @param moduleName
     * @param modulePath
     * @param handler
     */
    modulePoolLoader(moduleName, modulePath, handler) {
        if (!modulePath) {
            modulePath = moduleName;
        }

        if (!handler) {
            handler = (container, data) => {
                this[container][data.objectName] = data.object;
                console.info(`GameEngine: ModulePool: ${data.name} [${data.objectName}] loaded.`);
            };
        }

        const container = `$${moduleName}`;
        this[container] = {};
        const normalizedPath = path.join(__dirname, modulePath);

        require("fs").readdirSync(normalizedPath).forEach((file) => {
            const filePath = `./${modulePath}/${file}`.toLowerCase();
            const basename = path.basename(filePath ,".js");
            const moduleObject = require(filePath);

            handler(container, {
                name: moduleName,
                object: moduleObject,
                objectName: basename,
            });
        });
    }

    /**
     * Get module from pool
     * @param moduleName
     * @param classKey
     * @return {*}
     */
    getFromModulePool(moduleName, classKey) {
        if (!this[`$${moduleName}`][classKey]) {
            throw new Error(`Get new ${moduleName}[${classKey}] instance error: ${moduleName} class not found.`);
        }

        return this[`$${moduleName}`][classKey];
    }
    
    /**
     * Create instance from module pool
     * @param moduleName
     * @param classKey
     */
    createFromModulePool(moduleName, classKey) {
        const Class = this.getFromModulePool(moduleName, classKey);
        return new Class();
    }
    
    /**
     * Load models
     * @return {Engine}
     */
    loadModels() {
        this.modulePoolLoader(this.$const.model);
        return this;
    }

    /**
     * Create new Model instance.
     * @param name
     * @param connection
     */
    createModel(name, connection) {
        const Class = this.getFromModulePool(this.$const.model, name);
        return new Class(connection);
    }

    /**
     * Load actions
     */
    loadActions() {
        const name = this.$const.action;
        const handler = (container, data) => {
            const Action = data.object;
            const action = new Action(this);

            action.getNames().forEach((name) => {
                if(this[container][name]) {
                    throw new Error(`Duplicate ${data.name} name [${name}] loading error.`);
                }
                this[container][name] = Action;
            });

            console.debug(`GameEngine: ModulePool: ${data.name} [${action.getId()}] loaded.`);
        };

        this.modulePoolLoader(name, name, handler);

        return this;
    }

    /**
     * Create new Model instance.
     * @param name
     */
    createAction(name) {
        const Class = this.getFromModulePool(this.$const.action, name);
        return new Class(this);
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

    /**
     * Create new character into engine.
     * @param data
     * @return {{characterName: *, isSuccess: boolean}}
     */
    newCharacter(data) {
        console.debug("GameEngine: new character:", data);

        if (Array.isArray(data)) {
            data = data[0];
        }

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
     * Process action.
     *
     * @param action
     * @param actor
     * @param to
     * @return {object}
     */
    action(action, actor, to) {
        const returnMsg = this
            .createAction(action.name)
            .exec(actor, to, action.args)
            .getMessages();

        const returnObj = { messages: returnMsg };
        console.debug('GameEngine: action return: ', returnObj);

        return returnObj;
    }
}


module.exports = Engine;