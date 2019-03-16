const uuid = require('uuid')
const bcrypt = require('bcrypt')

const newHash = () => bcrypt.hash('1234567890x1', 5)

exports.seed = async knex => {
  const passwords = await Promise.all([newHash(), newHash(), newHash(), newHash()])

  const entries = passwords.map((password, index) => {
    return {
      id: uuid(),
      email: `demo.0${index}@demo.dev`,
      created_at: new Date(),
      password
    }
  })

  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      // Inserts seed entries
      return knex('users').insert(entries)
    })
}
