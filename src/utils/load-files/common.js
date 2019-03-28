const { curry, compose, map, reduce } = require('ramda')
const { readFile } = require('fs')
const { join } = require('path')
const readdir = require('readdir-enhanced')

/**
 * load a list of files
 *
 * @param {string} filter
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadFilesNames = curry((filter, dirname) => {
  return readdir(dirname, { deep: true, filter })
})

/**
 * @param {String} dirname
 * @param {String} fileName
 *
 * @returns {String}
 */
const makeFullname = curry((dirname, fileName) => join(dirname, fileName))

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
 * load files
 *
 * @param {Function<String>} dirname
 * @param {String} dirname
 * @param {Array<String>} files
 *
 * @returns {Object}
 */
const loadFiles = curry((getNameFn, dirname, files) => {
  return reduce((acc, fileName) => {
    const fullName = join(dirname, fileName)

    // import
    acc[getNameFn(fileName)] = require(fullName)

    return acc
  }, {}, files)
})

module.exports = { loadFilesNames, loadFilesContent, loadFiles }
