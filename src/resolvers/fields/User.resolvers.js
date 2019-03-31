module.exports = {
  clients: ({ id }, args, { services }) => {
    return services.db('clients').where({ user_id: id })
  }
}
