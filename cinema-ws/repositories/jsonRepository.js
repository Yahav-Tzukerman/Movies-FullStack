// repositories/jsonRepository.js
const fs = require('fs').promises;

const readJson = async (filePath) => {
  const content = await fs.readFile(filePath, 'utf-8');
  return JSON.parse(content);
};

const writeJson = async (filePath, data) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};

module.exports = { readJson, writeJson };
