const { reduce } = require('lodash')
const { makeListResolver, makeResourceResolver, makeSingleResolver } = require('./resolvers')
const { makeListName, makeSingleName, makeResourceName } = require('../utils')
const { normalizeResources } = require('../resources')

const generateResolvers = resources => {
  return reduce(normalizeResources(resources), (acc, resourceConfig) => {
    const { resource } = resourceConfig

    acc.RootQuery[makeSingleName(resource)] = makeSingleResolver(resourceConfig)
    acc.RootQuery[makeListName(resource)] = makeListResolver(resourceConfig)
    acc[makeResourceName(resource)] = makeResourceResolver(resourceConfig)

    return acc
  }, { RootQuery: {} })
}

module.exports = { generateResolvers }
