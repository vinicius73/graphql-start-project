const loadDirectives = require('../utils/load-files/directives')
const { resolve } = require('path')

// https://www.apollographql.com/docs/graphql-tools/schema-directives

module.exports = {
  loadDirectives: () => loadDirectives(resolve(__dirname, '../directives'))
}
