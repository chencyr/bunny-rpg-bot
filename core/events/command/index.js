
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
    getActionFrom() {
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
    async trigger() {
        const action = this.getAction();
        const actor = await this.getActionFrom();
        const to = await this.getActionTo();
        const engine = this.getGameEngine();
        const result = await engine.action(action, actor, to);

        console.info('Event: trigger return: ', result);
        return result
    }
}

module.exports = CommandEvent;