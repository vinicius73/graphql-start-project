const { defaults, range, toLower } = require('lodash')
const faker = require('faker')
const uuid = require('uuid')
const bcrypt = require('bcrypt')

const basePassword = '1234567890x1'

const newHash = () => bcrypt.hash(basePassword, 5)

const newUser = async (def = {}) => {
  const password = await newHash()
  const name = faker.name.findName()

  return defaults({}, def, {
    id: uuid(),
    email: toLower(faker.internet.email(...name.split(' '))),
    created_at: faker.date.recent(30),
    updated_at: faker.random.boolean() ? faker.date.recent(5) : null,
    is_active: faker.random.boolean(),
    is_admin: faker.random.boolean(),
    name,
    password
  })
}

exports.seed = async knex => {
  // generate fake users
  const entries = await Promise.all(
    range(0, 60).map(() => newUser())
  )

  entries.unshift(await newUser({
    email: 'demo@demo.dev',
    name: 'demo',
    is_admin: true,
    is_active: true
  }))

  console.warn('Admin Demo Data', {
    email: 'demo@demo.dev',
    password: basePassword
  })

  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  return knex('users').insert(entries)
}
