const { map, composeP, curry, compose } = require('ramda')
const { readFile } = require('fs')
const readdir = require('readdir-enhanced')
const path = require('path')

/**
 * @param {String} dirname
 * @param {String} fileName
 *
 * @returns {String}
 */
const makeFullname = curry((dirname, fileName) => path.join(dirname, fileName))

/**
 * load a list of graphql files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadGraphQLFilesNames = dirname => {
  return readdir(dirname, { deep: true, filter: '*.graphql' })
}

/**
 * load content of files
 *
 * @param {String} dirname
 * @param {Array<String>} files
 * @returns {Promise<Array<String>>}
 */
const loadFilesContent = curry((dirname, files) => {
  const promises = map(
    compose(loadFileContent, makeFullname(dirname)),
    files
  )

  return Promise.all(promises)
})

/**
 * load content of file
 *
 * @param {String} fileName
 * @returns {Promise<String>}
 */
const loadFileContent = fileName => {
  return new Promise((resolve, reject) => {
    readFile(fileName, 'utf8', (err, data) => {
      if (err) {
        reject(err)
        return
      }

      resolve(data)
    })
  })
}

/**
 * @method loadGraphQLFiles
 * @param  {string}         dirname
 * @return {Promise<Array<string>>}
 */
const loadGraphQLFiles = dirname => composeP(loadFilesContent(dirname), loadGraphQLFilesNames)(dirname)

module.exports = loadGraphQLFiles
