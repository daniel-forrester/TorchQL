const TypeGenerator = require('../generators/typeGenerator');

function generateCustomTypes(data) {
  const allTypes = [];
  const tables = Object.keys(data);
  for (const tableName of tables) {
    const { foreignKeys, columns } = data[tableName];
    // skip join tables for returning custom types
    if (foreignKeys === null || Object.keys(columns).length !== Object.keys(foreignKeys).length + 1) {
      allTypes.push(TypeGenerator.createCustomTypes(tableName, data));
    }
  }
  return allTypes;
}

function assembleCustomTypes(types) {
  let typeString = '';
  for (let i = 0; i < types.length; i++) {
    typeString += `${types[i]}\n`;
  }
  return typeString;
}

module.exports = {
  generateCustomTypes,
  assembleCustomTypes
}