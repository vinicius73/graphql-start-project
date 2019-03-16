
exports.up = function (knex) {
  return knex.schema.createTable('clients', function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.uuid('user_id').notNullable()
    table.boolean('deleted').defaultTo(false)
    table.timestamp('deleted_at').defaultTo(null)
    table.timestamps()

    table.foreign('user_id')
      .references('id')
      .on('users')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('clients')
}
