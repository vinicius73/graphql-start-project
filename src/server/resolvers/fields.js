const loadResolvers = require('../../utils/load-files/resolvers')
const { resolve } = require('path')

module.exports = {
  loadFields: () => loadResolvers(resolve(__dirname, '../../resolvers/fields'))
}
