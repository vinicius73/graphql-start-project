const uuid = require('uuid')

const AddProductMutation = async (root, { input }, { services }, info) => {
  const { db } = services
  const { name, client } = input
  const { description } = input || null

  return db('products')
    .returning('*')
    .insert({
      id: uuid(),
      name,
      description,
      client_id: client
    })
    .then(product => product[0])
}

module.exports = AddProductMutation
