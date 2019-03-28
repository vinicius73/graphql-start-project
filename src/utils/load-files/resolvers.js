const { composeP } = require('ramda')
const { loadFilesNames, loadFiles, makeGetName } = require('./common')

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
const getName = makeGetName('.resolver.js')

const loadResolvers = dirName => {
  return composeP(loadFiles(getName, dirName), loadResolversFilesNames)(dirName)
}

module.exports = loadResolvers
