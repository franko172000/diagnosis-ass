const csv=require('csvtojson');
csv();
exports.seed = async function(knex) {
    // Deletes ALL existing entries
    await knex('diagnosis').del();
    // const data = csvToJson.getJsonFromCsv('app/data/categories.csv');
    const data = await csv().fromFile('app/data/codes.csv');
    return knex('diagnosis').insert(data);
};
