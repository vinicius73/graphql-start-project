const cacheManager = require('cache-manager')
const redisStore = require('cache-manager-redis-store')
const { get } = require('lodash')

const factory = ({ config }) => {
  const options = get(config, ['services', 'redis'])

  return cacheManager.caching({
    store: redisStore,
    ...options
  })
}

module.exports = factory
