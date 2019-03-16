const { reduce, map } = require('lodash')
const { makeListResolver, makeResourceResolver, makeSingleResolver } = require('./resolvers')
const { makeListName, makeSingleName, makeResourceName } = require('./utils')

const normaliseResources = tables => {
  return map(tables, row => {
    return {
      ...row,
      resource: row.resource || row.table,
      applyWhere: row.applyWhere || {}
    }
  })
}

const generateResolvers = resources => {
  return reduce(normaliseResources(resources), (acc, resourceConfig) => {
    const { resource } = resourceConfig

    acc.RootQuery[makeSingleName(resource)] = makeSingleResolver(resourceConfig)
    acc.RootQuery[makeListName(resource)] = makeListResolver(resourceConfig)
    acc[makeResourceName(resource)] = makeResourceResolver(resourceConfig)

    return acc
  }, { RootQuery: {} })
}

module.exports = { generateResolvers }
