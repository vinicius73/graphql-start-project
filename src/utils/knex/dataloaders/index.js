const DataLoader = require('dataloader')
const { reduce, map } = require('lodash')
const { normalizeResources, queryFactory } = require('../resources')

const loadData = (resourceConfig, db, id) => {
  const query = queryFactory(db, resourceConfig, { id })
  return query
    .first()
}

const factoryBatchingFunc = (resourceConfig, services) => {
  return ids => {
    const { db } = services
    return Promise.all(
      map(ids, id => loadData(resourceConfig, db, id))
    )
  }
}

const generateDataLoaders = (resources, services) => {
  return reduce(normalizeResources(resources), (acc, resourceConfig) => {
    const { resource } = resourceConfig

    acc[resource] = new DataLoader(factoryBatchingFunc(resourceConfig, services))

    return acc
  }, {})
}

module.exports = { generateDataLoaders }
