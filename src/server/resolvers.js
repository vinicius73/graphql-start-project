const loadResolvers = require('../utils/load-resolvers')
const { resolve } = require('path')

module.exports = {
  loadResolvers: () => loadResolvers(resolve(__dirname, '../resolvers'))
}
