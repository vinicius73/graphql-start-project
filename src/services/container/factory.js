const { createContainer, InjectionMode, asValue, asFunction } = require('awilix')

const factory = (config, debug, factories) => {
  const container = createContainer({
    injectionMode: InjectionMode.PROXY
  })

  container.register('config', asValue(config))
  container.register('debug', asValue(debug))

  Object.entries(factories)
    .forEach(([key, fn]) => {
      const service = key === 'db'
        ? asFunction(fn).singleton()
        : asFunction(fn).scoped()

      container.register(
        key,
        service
      )
    })

  return container
}

module.exports = factory
