const {
  composeP, compose,
  contains,
  cond, split,
  head, T,
  replace
} = require('ramda')
const { loadFilesNames, loadFiles } = require('./common')

/**
 * load a list of resolvers files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadResolversFilesNames = loadFilesNames('**/**.resolver.js')

/**
 * @param {String} fileName
 * @returns {String}
 */
const getName = cond([
  [contains('/'), compose(head, split('/'))],
  [T, replace('.resolver.js', '')]
])

const loadResolvers = dirName => {
  return composeP(loadFiles(getName, dirName), loadResolversFilesNames)(dirName)
}

module.exports = loadResolvers
