const { ApolloServer } = require('apollo-server')
const { loadTypeDefs } = require('./type-defs')
const { getConfig } = require('./utils/config')
const { showServerInfo } = require('./utils/server-info')
const { contextFactory } = require('./context')
const { factoryPlaygroundOptions } = require('./playground')
const { loadResolvers } = require('./resolvers')

let started = false

/**
 * get server port
 * @param {config} config
 * @returns {number}
 */
const getPort = config => {
  if (config.PORT) {
    return config.PORT
  }

  return process.env.PORT || 8081
}

const serverFactory = async () => {
  // prevents the server from starting more than once.
  if (started) {
    return Promise.reject(new Error('server was created'))
  }

  started = true

  const config = getConfig()

  // need to be imported after handling the env
  const debug = require('./utils/debug')

  const [typeDefs, resolvers] = await Promise.all(
    [loadTypeDefs(), loadResolvers()]
  )

  const isProduction = config.NODE_ENV === 'production'

  const server = new ApolloServer({
    cors: true,
    resolvers,
    typeDefs,
    tracing: !isProduction,
    introspection: !isProduction,
    playground: factoryPlaygroundOptions(config),
    context: contextFactory({ config, debug })
  })

  const info = await server.listen({ port: getPort(config) })

  await showServerInfo(config, info)

  console.log(`🚀  Server ready (${config.NODE_ENV || 'development'})`)

  // allows extra manipulation of this variables
  return { server, info, config, debug }
}

module.exports = { serverFactory }
