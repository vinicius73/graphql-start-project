const { gql } = require('apollo-server')
const { resolve } = require('path')
const loadGraphQLFiles = require('../utils/load-graphql-files')

/**
 * load and generate GraphQL types defs
 *
 * @returns {Promise<DocumentNode>}
 */
const loadTypeDefs = () => {
  const dirName = resolve(__dirname, '../type-defs')
  return loadGraphQLFiles(dirName)
    .then(types => types.join(`\n`))
    .then(typeDefs => gql`${typeDefs}`)
}

module.exports = { loadTypeDefs }
