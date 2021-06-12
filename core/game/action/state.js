

/**
 * State action.
 */
class State
{
    /**
     * Constructor
     * @param context
     */
    constructor(context) {
        this.context = context;
    }

    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "state";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "state",
            "狀態",
        ];
    }

    /**
     * Check actor can do the action.
     * @param actor
     * @return {boolean}
     */
    isActorCanAction(actor) {
        return true;
    }

    /**
     * Check action to the object.
     * @param object
     */
    isActionCanTo(object) {
        return true;
    }

    /**
     * Execute action.
     * @param actor
     * @param to
     */
    exec(actor, to) {
        this.isActorCanAction(actor);
        this.isActionCanTo(to);
    }

    getMessages() {

    }

}

module.exports = State;