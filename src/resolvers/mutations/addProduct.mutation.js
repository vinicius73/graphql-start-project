const uuid = require('uuid')
const { head } = require('lodash')

const AddProductMutation = async (root, { input }, { services }, info) => {
  const { db } = services
  const { name, client, description } = input

  return db('products')
    .returning('*')
    .insert({
      id: uuid(),
      name,
      description,
      client_id: client
    })
    .then(head)
}

module.exports = AddProductMutation
