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

            const maxTo = AppInteraction.getLess(receivers.length, effect.max_to);
            const repeat = AppInteraction.getLess(effect.repeat, 9999);
            for (let ri = 0; ri < maxTo; ri++) {
                const receiver =  receivers[ri];
                for (let pi = 1; pi <= repeat; pi++) {
                    if (effect.ignore(pi, sender, receiver, args)) {
                        continue;
                    }

                    const result = await this.receiving(effect, sender, receiver, args);
                    if (result.break) break;
                    if (result.continue) continue;
                    if (result.terminate) return this;
                }
            }
        }

        if (await this.afterInteraction(senders, receivers, args)) {
            return this;
        }
    }

    /**
     * Get less number.
     * @param number1
     * @param number2
     * @return {*} min will return 1
     */
    static getLess(number1, number2) {
        number1 = number1 || 1;
        number2 = number2 || 1;

        if(number1 < number2) {
            return number1;
        }

        return number2;
    }
}

module.exports = AppInteraction;