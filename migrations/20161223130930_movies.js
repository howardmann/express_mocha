
exports.up = function(knex, Promise) {
  return knex.schema.createTable('movies', function(table){
    table.increments();
    table.string('name').notNullable();
    table.string('director');
    table.integer('year');
    table.string('genre');
    table.integer('user_id').unsigned().references('users.id').onDelete('set null');    
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.timestamp('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("movies");
};
