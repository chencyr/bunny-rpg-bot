/**
 * Character base class
 *
 */
class Character
{
    /**
     * Init player
     * @param initInfo
     * @constructor
     */
    constructor(initInfo) {
        this.name = initInfo.name;
        this.userId = initInfo.userId;
        this.level = 1;
        this.job = "無職業";
        this.title = "無稱號";
        this.status = {
            hp: 100,
            mp: 20,
            str: 10,
            vit: 10,
            dex: 10,
            agi: 10,
            int: 10,
            luk: 10,
        }
    }

    getStatus() {
        return this.status;
    }

    getName() {
        return this.name;
    }

    getJob() {
        return this.job;
    }

    getLevel() {
        return this.level;
    }

    getTitle() {
        return this.title;
    }
}

module.exports = Character;