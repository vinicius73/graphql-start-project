module.exports = {
  products: ({ id }, args, { services }) => {
    return services.db('products').where({ client_id: id })
  },
  user: ({ user_id }, args, { services }) => {
    return services.db('products').where({ id: user_id }).first()
  }
}
