
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary()
    table.string('email').unique()
    table.string('password')
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
