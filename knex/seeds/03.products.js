const { range, shuffle, sample } = require('lodash')
const faker = require('faker')
const uuid = require('uuid')

const newProduct = async (clientId) => {
  const deleted = faker.random.boolean()

  return {
    id: uuid(),
    name: faker.commerce.productName(),
    description: faker.random.boolean() ? faker.lorem.paragraph() : null,
    created_at: faker.date.recent(30),
    updated_at: faker.random.boolean() ? faker.date.recent(5) : null,
    deleted_at: deleted ? faker.date.recent(5) : null,
    client_id: clientId,
    deleted
  }
}

exports.seed = async knex => {
  const users = shuffle(await knex('clients').select('id'))
  const entries = await Promise.all(
    range(0, 2500).map(() => newProduct(sample(users).id))
  )

  // Deletes ALL existing entries
  await knex('products').del()

  // Inserts seed entries
  return knex('products').insert(entries)
}
