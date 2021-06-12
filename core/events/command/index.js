
/**
 * CommandEvent base class
 */
class CommandEvent {

    /**
     * Trigger this event automatically
     * @param event
     */
    trigger(event) {
        return {
            hasException: false,
            getMessages: {
                type: 'text',
                text: `Leo HP最大值:10 目前HP:10 每秒恢復:10`,
            },
        };
    }
}

module.exports = CommandEvent;