const { range, shuffle, sample } = require('lodash')
const faker = require('faker')
const uuid = require('uuid')

const newProduct = async (userId) => {
  const deleted = faker.random.boolean()

  return {
    id: uuid(),
    name: faker.company.companyName(),
    created_at: faker.date.recent(30),
    updated_at: faker.random.boolean() ? faker.date.recent(5) : null,
    deleted_at: deleted ? faker.date.recent(5) : null,
    user_id: userId,
    deleted
  }
}

exports.seed = async knex => {
  const users = shuffle(await knex('users').select('id'))
  const entries = await Promise.all(
    range(0, 300).map(() => newProduct(sample(users).id))
  )

  await knex.raw('ALTER TABLE clients DISABLE TRIGGER ALL')
  await knex('clients').del()
  await knex.raw('ALTER TABLE clients ENABLE TRIGGER ALL')

  // Inserts seed entries
  return knex('clients').insert(entries)
}
