const {
  composeP, compose,
  contains, reduce,
  cond, split,
  head, T,
  replace, curry
} = require('ramda')

const { join } = require('path')
const readdir = require('readdir-enhanced')

/**
 * load a list of resolvers files
 *
 * @param {string} dirname
 * @returns {Promise<Array<String>>}
 */
const loadResolversFilesNames = dirname => {
  return readdir(dirname, { deep: 2, filter: '**/**.resolver.js' })
}

/**
 * @param {String} fileName
 * @returns {String}
 */
const getName = cond([
  [contains('/'), compose(head, split('/'))],
  [T, replace('.resolver.js', '')]
])

/**
 * load resolvers
 *
 * @param {String} dirname
 * @param {Array<String>} files
 *
 * @returns {Object}
 */
const load = curry((dirname, files) => {
  return reduce((acc, fileName) => {
    const fullName = join(dirname, fileName)

    acc[getName(fileName)] = require(fullName)

    return acc
  }, {}, files)
})

const loadResolvers = dirName => {
  return composeP(load(dirName), loadResolversFilesNames)(dirName)
}

module.exports = loadResolvers
