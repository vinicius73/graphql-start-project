const { ApolloServer } = require('apollo-server')
const { loadTypeDefs } = require('./type-defs')

const resolvers = {
  RootQuery: {
    hello: () => 'world'
  }
}

const factoryIntance = async () => {
  const typeDefs = await loadTypeDefs()

  return new ApolloServer({
    resolvers,
    typeDefs
  })
}

const serverFactory = async () => {
  const server = await factoryIntance()

  return new Promise((resolve, reject) => {
    server.listen().then(() => {
      resolve(server)
    }, reject)
  })
}

module.exports = { serverFactory }
