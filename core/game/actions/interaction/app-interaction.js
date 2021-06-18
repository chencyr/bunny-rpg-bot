const Interaction = require('./interaction');

/**
 * AppInteraction base class.
 */
class AppInteraction extends Interaction
{
    /**
     * Execute action for child class implement
     * @param from
     * @param to
     * @param args
     */
    async handler(from, to, args) {
        const receivers = await this.getReceivedObjects(to, args);
        const senders = await this.getSendObjects(from, args);

        if (this.beforeInteraction(senders, receivers, args)) {
            return this;
        }

        for (let sender of senders.values()) {

            this.beforeSend(sender, receivers, args);
            const interaction = this.sending(sender, receivers, args);
            this.afterSend(interaction, sender, receivers, args);

            for(let receiver of receivers.values()) {

                this.beforeReceived(interaction, sender, receiver, args);
                const result = this.receiving(interaction, sender, receiver, args);
                if (result.break) break;
                if (result.continue) continue;
                if (result.terminate) return this;
                this.afterReceived(result, interaction, sender, receiver, args);
            }
        }

        if (this.afterInteraction(senders, receivers, args)) {
            return this;
        }
    }
}

module.exports = AppInteraction;