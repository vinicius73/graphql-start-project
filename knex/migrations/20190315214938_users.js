
exports.up = function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.uuid('id').primary()
    table.string('email').unique()
    table.string('name').notNullable()
    table.string('password')
    table.boolean('is_active').defaultTo(true)
    table.boolean('is_admin').defaultTo(false)
    table.timestamps()
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
