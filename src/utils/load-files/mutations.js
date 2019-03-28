const { composeP } = require('ramda')
const { loadFilesNames, loadFiles, makeGetName } = require('./common')

/**
 * load a list of mutations files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadMutationsFilesNames = loadFilesNames('**/**.mutation.js')

/**
 * @param {String} fileName
 * @returns {String}
 */
const getName = makeGetName('.mutation.js')

const loadMutations = dirName => {
  return composeP(loadFiles(getName, dirName), loadMutationsFilesNames)(dirName)
}

module.exports = loadMutations
