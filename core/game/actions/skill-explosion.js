const Action = require('./interaction');

/**
 * Skill action.
 */
class SkillExplosion extends Action
{
    /**
     * Get action ID.
     * @return {string}
     */
    getId() {
        return "skill-explosion";
    }

    /**
     * Get action master name.
     * @return {string}
     */
    getNames() {
        return [
            "explosion",
            "爆裂魔法",
        ];
    }

    /**
     * Hooker for before interaction
     * @param senders
     * @param receivers
     * @return {boolean}
     */
    beforeInteraction(senders, receivers) {
        if (senders.length == 0) {
            this.writeMsg(`沒有可執行 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        if (receivers.length == 0) {
            this.writeMsg(`沒有可接受 [${this.getNames()[0]}] 此操作的對象`); return true;
        }

        // for (let is in senders) {
        //     const sender = sneders[is];
        //     const service = this.context.getService('character-service');
        //     if (sender.state instanceof service.DeadState) {
        //         this.writeMsg(`${receiver.getName()} 炸開成為屑屑!!`);
        //     }
        // }
        //
        // for (let ir in receivers) {
        //
        // }
    }

    /**
     * Hooker for sending
     * @param sender
     * @param receivers
     * @param args
     * @return {object}
     */
    sending(sender, receivers, args) {
        // TODO: refactor use magic attack (compute by int)
        const damage = sender.createDamage();
        damage.accuracy += 999999;
        damage.value = damage.value * 10;

        return damage;
    }

    /**
     * Hooker for after send
     * @param damage
     * @param sender
     * @param receivers
     * @param args
     */
    afterSend(damage, sender, receivers, args) {
        this.writeImg('statics/skill-explosion.png');
        this.writeMsg('吾名惠惠。紅魔族首屈一指的魔法師，操縱爆裂魔法之人。好好見識吾之力量吧！Explosion !!').sendMsg();
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
        const characterService = this.context.getService('character-service');
        const result = receiver.receiveDamage(interaction);

        if (result.isDodge == true) {
            this.writeMsg(`${sender.getName()} 轟炸了 ${receiver.getName()}，但技巧很差被 ${receiver.getName()} 閃過了!!`);
            result.continue = true;
        }

        this.writeMsg(`${sender.getName()} 爆裂了 ${receiver.getName()}，${receiver.getName()} 受到 -${result.damageHp} HP 損傷!!`);
        if (receiver.state instanceof characterService.DeadState) {
            this.writeMsg(`${receiver.getName()} 炸開成為屑屑!!`);
        }

        return result;
    }

    /**
     * Hooker for after received
     * @param result
     * @param interaction
     * @param sender
     * @param receiver
     * @param args
     */
    afterReceived(result, interaction, sender, receiver, args) {
        if (result.exp > 0) {
            const isLevelUp = sender.receivedExp(result.exp);
            this.writeMsg(`${sender.getName()} 獲得經驗值 ${result.exp} exp!!`);
            if(isLevelUp) {
                this.writeMsg(`你的等級提升了!! LV.${sender.getLevel()}`);
            }
        }
    }

}

module.exports = SkillExplosion;