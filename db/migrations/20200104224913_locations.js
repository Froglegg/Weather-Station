exports.up = function(knex) {
  return knex.schema.createTable("locations", table => {
    table.increments("id");
    table.string("country", 255);
    table.string("locality", 255);
    table.integer("user").unsigned();
    table.foreign("user").references("users.id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  knex.schema.dropTableIfExists("locations");
};
