const loadResolvers = require('../utils/load-files/resolvers')
const { generateResolvers } = require('../utils/knex/resolvers')
const { resolve } = require('path')
const { defaultsDeep } = require('lodash')

const makeResourceResolvers = () => {
  return generateResolvers(
    require('../resolvers/resources')
  )
}

module.exports = {
  loadResolvers: async () => {
    const baseResolvers = await loadResolvers(resolve(__dirname, '../resolvers'))
    return defaultsDeep({}, makeResourceResolvers(), baseResolvers)
  }
}
