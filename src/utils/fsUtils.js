const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const TALKER_DATA_PATH = '../talker.json';

async function readTalkerData() {
  try {
    const data = await fs.readFile(path.resolve(__dirname, TALKER_DATA_PATH));

    const talkers = JSON.parse(data);
    return talkers;
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
}

async function writeNewTalkerData(talkers) {
  try {
    const allTalkers = JSON.stringify(talkers, null, 2);

    await fs.writeFile(path.resolve(__dirname, TALKER_DATA_PATH), allTalkers);
    console.log('Arquivo escrito com sucesso!');
  } catch (error) {
    console.error(`Erro ao ler o arquivo: ${error}`);
  }
}

// utils/generateToken.js
function generateToken() {
  return crypto.randomBytes(8).toString('hex');
}

module.exports = {
  readTalkerData,
  writeNewTalkerData,
  generateToken,
};