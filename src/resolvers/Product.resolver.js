module.exports = {
  client: ({ client_id }, args, { dataLoaders }) => {
    return dataLoaders.clients.load(client_id)
  }
}
