const { gql } = require('apollo-server')
const { resolve } = require('path')
const loadGraphQLFiles = require('../utils/load-files/graphql')

/**
 * load and generate GraphQL types defs
 *
 * @returns {Promise<DocumentNode>}
 */
const loadTypeDefs = () => {
  const dirName = resolve(__dirname, '../type-defs')

  return loadGraphQLFiles(dirName) // list of contents
    .then(types => types.join('\n')) // join all files in a single string
    .then(typeDefs => gql`${typeDefs}`) // apply "gql" function
}

module.exports = { loadTypeDefs }
