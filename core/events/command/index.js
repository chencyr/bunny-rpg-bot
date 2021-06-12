
/**
 * CommandEvent base class
 */
class CommandEvent {

    /**
     * Get action data.
     *
     * @return {object} Action info object {name: <string>, args: [<string>, <string>, ...]}
     */
    getAction() {
        throw new Error('Not implement method.');
    }

    /**
     * Get actor data.
     *
     * @return {{userId: string}}
     */
    getActor() {
        throw new Error('Not implement method.');
    }

    /**
     * Get action to data
     *
     * @return {Array}
     */
    getActionTo() {
        throw new Error('Not implement method.');
    }

    /**
     * Get game engine instance
     *
     * @return {GameEngine}
     */
    getGameEngine() {
        throw new Error('Not implement method.');
    }

    /**
     * Trigger this event automatically
     * @return {*}
     */
    trigger() {
        const action = this.getAction();
        const actor = this.getActor();
        const to = this.getActionTo();
        const engine = this.getGameEngine();

        return engine.action(action, actor, to);
    }
}

module.exports = CommandEvent;