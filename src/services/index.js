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
const factory = (config, debug) => {
  return factoryTokenInject(config, debug, factories)
}

module.exports = { factory }
