const { map } = require('lodash')
const { normalizeResources } = require('../resources')
const { factoryDataLoaderBuilder } = require('./factory')

const generateDataLoaders = (resourcesRaw, services) => {
  const cache = {}

  const resources = normalizeResources(resourcesRaw)
  const factory = factoryDataLoaderBuilder(resources, services)

  return new Proxy(cache, {
    set () {
      throw new Error(`it is not possible to modify the dataLoader.`)
    },
    ownKeys () {
      return map(resources, 'resource')
    },
    get (target, prop) {
      if (!target[prop]) {
        cache[prop] = factory(prop)
      }

      return target[prop]
    }
  })
}

module.exports = { generateDataLoaders }
