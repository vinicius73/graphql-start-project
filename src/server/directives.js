const loadDirectives = require('../utils/load-files/directives')
const { resolve } = require('path')

module.exports = {
  loadDirectives: () => loadDirectives(resolve(__dirname, '../directives'))
}
