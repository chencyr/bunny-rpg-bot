
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
    let text = "";

    text += '\n';
    text += `[角色資訊] \n`;
    text += '-----------------------------------------------\n';
    text += `名稱 : ${character.getName()}\n`;
    text += `等級 : ${character.getLevel()}\n`;
    text += `狀態 : ${character.getState()}\n`;
    text += `金幣 : ${character.coin}\n`;
    text += '-----------------------------------------------\n';
    text += `累計EXP : ${character.getExp()}/${character.getNextExp()}\n`;
    text += `擊殺EXP : ${character.toExp()}\n`;
    text += '-----------------------------------------------\n';
    text += '\n';
    text += '[能力值] \n';
    text += '-----------------------------------------------\n';
    text += `HP : ${character.currentHP}/${character.maxHP}\n`;
    text += `MP : ${character.currentMP}/${character.maxMP}\n`;
    text += `SP : ${character.currentSP}/${character.maxSP}\n`;
    text += '-----------------------------------------------\n';
    text += `STR : ${character.str} (${signFormatter(character.adjustSTR)})    VIT : ${character.vit} (${signFormatter(character.adjustVIT)})\n`;
    text += `DEX : ${character.dex} (${signFormatter(character.adjustDEX)})    AGI : ${character.agi} (${signFormatter(character.adjustAGI)})\n`;
    text += `INT : ${character.int} (${signFormatter(character.adjustINT)})    LUK : ${character.luk} (${signFormatter(character.adjustLUK)})\n`;
    text += '-----------------------------------------------\n';
    text += '\n';

    text += `[祝福 & 詛咒]\n`;
    text += '-----------------------------------------------\n';
    character.getBuffs().forEach((buff) => {
        text += `${buff.getDisplayName()} \n`;
    });
    text += '-----------------------------------------------\n';
    text += '\n';

    text += `[技能]\n`;
    text += '-----------------------------------------------\n';
    const skills = character.getSkills();
    for (const [name, skill] of Object.entries(skills)) {
        text += `${skill.display_name} \n`;
    }
    text += '-----------------------------------------------\n';

    return text;
};

module.exports = OutputStatusBoard;