
/**
 * ReceivingBehavior base class
 */
class ReceivingBehavior
{
    /**
     * Hooker for receiving
     * @param effect
     * @param sender
     * @param receiver
     * @param args
     * @return {object}
     */
    async receiving (effect, sender, receiver, args) {
        // nothings to do.
    };
}


module.exports = ReceivingBehavior;