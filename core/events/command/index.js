
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

    getActor() {
        throw new Error('Not implement method.');
    }

    getActionTo() {
        throw new Error('Not implement method.');
    }

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