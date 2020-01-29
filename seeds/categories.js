const csv=require('csvtojson')
csv()
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('category').del();
  // const data = csvToJson.getJsonFromCsv('app/data/categories.csv');
  const data = await csv().fromFile('app/data/categories.csv');
  return knex('category').insert(data);
};
