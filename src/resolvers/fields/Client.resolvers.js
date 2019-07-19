module.exports = {
  products: ({ id }, args, { services }) => {
    return services.db('products').where({ client_id: id })
  },
  // eslint-disable-next-line camelcase
  user: ({ user_id }, args, { dataLoaders }) => {
    return dataLoaders.users.load(user_id)
  }
}
