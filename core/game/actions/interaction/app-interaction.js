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

        if (await this.beforeInteraction(senders, receivers, args)) {
            return this;
        }

        for (let sender of senders.values()) {
            const effect = await this.sending(sender, receivers, args);
            if (effect.break) break;
            if (effect.continue) continue;
            if (effect.terminate) return this;

            for(let receiver of receivers.values()) {
                const result = await this.receiving(effect, sender, receiver, args);
                if (result.break) break;
                if (result.continue) continue;
                if (result.terminate) return this;
            }
        }

        if (await this.afterInteraction(senders, receivers, args)) {
            return this;
        }
    }
}

module.exports = AppInteraction;