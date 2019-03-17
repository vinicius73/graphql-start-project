module.exports = {
  client: ({ client_id }, args, { services }) => {
    return services.db('clients').where({ id: client_id }).first()
  }
}
