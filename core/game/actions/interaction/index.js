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
     * @return {boolean}
     */
    beforeInteraction(senders, receivers) {
        // Nothing to do.
    }

    /**
     * Hooker for after interaction
     * @param senders
     * @param receivers
     * @return {boolean}
     */
    afterInteraction(senders, receivers) {
        // Nothing to do.
    }

    /**
     * Hooker for before send
     * @param sender
     * @param receivers
     * @param args
     */
    beforeSend(sender, receivers, args) {
        // Nothing to do.
    }

    /**
     * Hooker for sending
     * @param sender
     * @param receivers
     * @param args
     * @return {object}
     */
    sending(sender, receivers, args) {
        // Nothing to do.
        return {};
    }

    /**
     * Hooker for after send
     * @param damage
     * @param sender
     * @param receivers
     * @param args
     */
    afterSend(damage, sender, receivers, args) {
        // Nothing to do.
    }

    /**
     * Hooker for before received
     * @param interaction
     * @param sender
     * @param receiver
     * @param args
     */
    beforeReceived(interaction, sender, receiver, args) {
        // Nothing to do.
    }

    /**
     * Hooker for receiving
     * @param interaction
     * @param sender
     * @param receiver
     * @param args
     * @return {object}
     */
    receiving(interaction, sender, receiver, args) {
        // Nothing to do.
        return {};
    }

    afterReceived(result, interaction, sender, receiver, args) {
        // Nothing to do.
    }
}

module.exports = InteractionAction;