const Action = require('../action');
const DefaultInteraction = require('./app-interaction');
const DefaultSenderGetter = require('./single-player-sender-getter');
const DefaultReceiverGetter = require('./all-character-receiver-getter');

/**
 * Interaction action.
 */
class InteractionAction extends Action
{
    /**
     * Constructor
     * @param context
     */
    constructor(context) {
        super(context);

        const handler = {
            get: function(target, name) {

                if (name == 'handler') {
                    return Reflect.get(target.getInteractionMode().prototype, "handler");
                }

                if (name == 'getSendObjects') {
                    return Reflect.get(target.getSenderGetter().prototype, "getSendObjects");
                }

                if (name == 'getReceivedObjects') {
                    return Reflect.get(target.getReceiverGetter().prototype, "getReceivedObjects");
                }

                return Reflect.get(target, name);
            },
        };

        return new Proxy(this, handler);
    }

    /**
     * Get interaction mode class
     * @return {Interaction}
     */
    getInteractionMode() {
        return DefaultInteraction;
    }

    /**
     * Get sender getter class
     * @return {SenderGetter}
     */
    getSenderGetter() {
        return DefaultSenderGetter;
    }

    /**
     * Get receiver getter class
     * @return {ReceiverGetter}
     */
    getReceiverGetter() {
        return DefaultReceiverGetter;
    }

    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "interaction-action";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "interaction-action",
        ];
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @param args
     * @return {boolean}
     */
    async beforeInteraction(senders, receivers, args) {
        // Nothing to do.
    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @param args
     * @return {boolean}
     */
    async afterInteraction(senders, receivers, args) {
        // Nothing to do.
    }

    /**
     * Hooker for sending
     * @param sender
     * @param receivers
     * @param args
     * @return {object}
     */
    async sending(sender, receivers, args) {
        // Nothing to do.
        return {};
    }

    /**
     * Hooker for receiving
     * @param effect
     * @param sender
     * @param receiver
     * @param args
     * @return {object}
     */
    async receiving(effect, sender, receiver, args) {
        // Nothing to do.
        return {};
    }
}

module.exports = InteractionAction;