const loadResolvers = require('../utils/load-files/resolvers')
const { generateResolvers } = require('../utils/knex/resolvers')
const { resolve } = require('path')
const { defaultsDeep } = require('lodash')
const { loadMutations } = require('./mutations')

const makeResourceResolvers = () => {
  return generateResolvers(
    require('../resolvers/resources')
  )
}

module.exports = {
  loadResolvers: async () => {
    const [baseResolvers, mutations] = await Promise.all([
      loadResolvers(resolve(__dirname, '../resolvers')),
      loadMutations()
    ])
    return defaultsDeep({ ...mutations }, makeResourceResolvers(), baseResolvers)
  }
}
