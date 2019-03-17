const { asValue } = require('awilix')
const factoryContainer = require('./factory')

const factoryTokenInject = (config, debug, factories) => {
  const container = factoryContainer(config, debug, factories)
  return token => {
    const scoped = container.createScope()

    scoped.register({
      token: asValue(token),
      has: asValue(container.has.bind(container))
    })

    return scoped.cradle
  }
}

module.exports = { factoryTokenInject }
