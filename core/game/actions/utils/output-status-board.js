
const signFormatter = function (number) {
    if(number >= 0) {
        return `+${number}`;
    }
    return number;
};

/**
 * Output character status board.
 *
 * @params character {Character}
 * @return {string}
 */
const OutputStatusBoard = function(character) {
    let text = `名稱: ${character.getName()}   等級: ${character.getLevel()}   職業: ${character.getJob()}\n`;
    text += '-----------------------------------------------\n';
    text += `狀態: ${character.getState()}   稱號: ${character.getTitle()}\n`;
    text += '-----------------------------------------------\n';
    text += `經驗值: ${character.getExp()}/${character.getNextExp()}\n`;
    text += '-----------------------------------------------\n';
    text += `HP: ${character.currentHP}/${character.maxHP}\n`;
    text += `MP: ${character.currentMP}/${character.maxMP}\n`;
    text += `SP: ${character.currentSP}/${character.maxSP}\n`;
    text += '-----------------------------------------------\n';
    text += `STR: ${character.str} (${signFormatter(character.adjustSTR)})    VIT: ${character.vit} (${signFormatter(character.adjustVIT)})\n`;
    text += `DEX: ${character.dex} (${signFormatter(character.adjustDEX)})    AGI: ${character.agi} (${signFormatter(character.adjustAGI)})\n`;
    text += `INT: ${character.int} (${signFormatter(character.adjustINT)})    LUK: ${character.luk} (${signFormatter(character.adjustLUK)})\n`;
    text += '-----------------------------------------------\n';

    text += `加護: \n`;
    character.getBuffs().forEach((buff) => {
        text += `${buff.getDisplayName()} \n`;
    });

    return text;
};

module.exports = OutputStatusBoard;