/**
 * require config and add env data to process.env
 * @returns {config}
 */
const getConfig = () => {
  const config = require('config')
  const { env } = config

  // inject env config into process.env
  Object.keys(env)
    .forEach(key => {
      process.env[key] = env[key]
    })

  return config
}

module.exports = { getConfig }
