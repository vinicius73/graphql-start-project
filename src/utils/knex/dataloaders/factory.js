const DataLoader = require('dataloader')
const { find } = require('lodash')
const { factoryBatchingFunc } = require('./load')

/**
 *
 * @param {Array<Object>} resources
 * @param {Object} services
 * @param {string} key
 *
 * @returns {DataLoader}
 */
const factoryDataLoaderBuilder = (resources, services) => key => {
  const resourceConfig = find(resources, row => row.resource === key)

  if (!resourceConfig) {
    throw new Error(`${key} not a valid dataLoader`)
  }

  return new DataLoader(factoryBatchingFunc(resourceConfig, services))
}

module.exports = { factoryDataLoaderBuilder }
