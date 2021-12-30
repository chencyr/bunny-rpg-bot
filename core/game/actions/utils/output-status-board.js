
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
    text += `STR: ${character.str}(${character.adjustSTR})    VIT: ${character.vit}\n`;
    text += `DEX: ${character.dex}    AGI: ${character.agi}\n`;
    text += `INT: ${character.int}    LUK: ${character.luk}\n`;
    text += '-----------------------------------------------\n';

    return text;
};

module.exports = OutputStatusBoard;