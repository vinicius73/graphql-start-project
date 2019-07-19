module.exports = {
  // eslint-disable-next-line camelcase
  client: ({ client_id }, args, { dataLoaders }) => {
    return dataLoaders.clients.load(client_id)
  }
}
