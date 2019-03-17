const factories = require('./factories')
const { factoryTokenInject } = require('./container')

/**
 * factory context container
 *
 * @param {c.config} config
 * @param {debug} debug
 *
 * @returns {Function}
 */
const makeServicesFactoy = (config, debug) => {
  return factoryTokenInject(config, debug, factories)
}

module.exports = { makeServicesFactoy }
