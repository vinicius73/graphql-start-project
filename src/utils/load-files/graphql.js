const { composeP } = require('ramda')
const { loadFilesNames, loadFilesContent } = require('./common')

/**
 * load a list of graphql files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadGraphQLFilesNames = loadFilesNames('*.graphql')

/**
 * @method loadGraphQLFiles
 * @param  {string}         dirname
 * @return {Promise<Array<string>>}
 */
const loadGraphQLFiles = dirname => composeP(loadFilesContent(dirname), loadGraphQLFilesNames)(dirname)

module.exports = loadGraphQLFiles
