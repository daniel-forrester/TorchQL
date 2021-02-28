const Generate = require('../generators/queryGenerator');

// Returns get all root queries as array of strings
function generateAllQuery(data) {
    const allQuery = [];
    const table = Object.keys(data);
    for(let i = 0; i < table.length; i += 1){
        let allQueryStr = Generate.allColumns(table[i]);
        allQuery.push(allQueryStr);
    }
    return allQuery;
};

// Returns get one root queries as array of strings
function generateOneQuery(data) {
    const oneQuery = [];
    const table = Object.keys(data);
    for(let i = 0; i < table.length; i += 1){
        const { primaryKey, columns } = data[table[i]];
        let oneQueryStr = Generate.column(table[i], primaryKey, columns)
        oneQuery.push(oneQueryStr)
    }
    return oneQuery;
}; 

function generateReturnQueries(allQuery, oneQuery) {
    let queryStr = '';
    for(let i = 0; i < allQuery.length; i += 1) queryStr += `\n ${allQuery[i]} \n ${oneQuery[i]}`
    return queryStr;
}

function formatQueries(query){
    return(
        `const RootQuery = new GraphQLObjectType({\n` +
        `  name: 'RootQueryType',\n` +
        `  fields: {` +
        `${query}\n`
    )
}

module.exports = {
    generateAllQuery,
    generateOneQuery,
    generateReturnQueries,
    formatQueries
}