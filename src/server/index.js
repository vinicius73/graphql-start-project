const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    "A simple type for getting started!"
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'world'
  }
}

const serverFactory = () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers
  })

  return new Promise((resolve, reject) => {
    server.listen().then(() => {
      resolve(server)
    }, reject)
  })
}

module.exports = { serverFactory }
