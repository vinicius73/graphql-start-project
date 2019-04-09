
exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.uuid('id').primary()
    table.string('name').notNullable()
    table.text('description')
    table.uuid('client_id').notNullable()
    table.boolean('deleted').defaultTo(false)
    table.timestamp('deleted_at').defaultTo(null)
    table.timestamps(true, true)

    table.foreign('client_id')
      .references('id')
      .inTable('clients')
      .onDelete('CASCADE')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('products')
}
