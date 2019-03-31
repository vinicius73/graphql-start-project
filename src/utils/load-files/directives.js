const { composeP } = require('ramda')
const { loadFilesNames, loadFiles, makeGetName } = require('./common')

/**
 * load a list of directives files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadDirectivesFilesNames = loadFilesNames('**/**.directive.js')

/**
 * @param {String} fileName
 * @returns {String}
 */
const getName = makeGetName('.directive.js')

const loadDirectives = dirName => {
  return composeP(loadFiles(getName, dirName), loadDirectivesFilesNames)(dirName)
}

module.exports = loadDirectives
