
exports.up = function(knex) {
    return knex.schema.createTable('diagnosis', table=>{
        table.string('full_code').notNullable();
        table.string('category').notNullable();
        table.string('diagnosis_code').defaultTo('');
        table.string('full_description').notNullable();
        table.string('partial_description').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
        table.primary(['full_code']);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('diagnosis');
};
