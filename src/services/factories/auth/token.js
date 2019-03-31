const jwt = require('jsonwebtoken')
const { isEmpty } = require('lodash')

/**
 * @param {string} secret
 * @param {Object} payload
 * @param {string|number} expiresIn
 * @returns {Promise<Object>}
 */
const makeToken = (secret, payload, expiresIn) => {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn }, (err, token) => {
      if (err) {
        reject(err)
        return
      }

      resolve(token)
    })
  })
}

/**
 * @param {string} secret
 * @param {string} token
 * @returns {Promise<Object>}
 */
const decode = (secret, token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        reject(err)
        return
      }

      resolve(decoded)
    })
  })
}

/**
 * @param {knex} db
 * @param {string} secret
 * @param {string} token
 * @returns {Promise<Object>}
 */
const loadUser = async (db, secret, token) => {
  return decode(secret, token)
    .then(decoded => {
      console.log({ decoded })
      const { id } = decoded
      return db('users')
        .where({ id, is_active: true })
        .first()
    })
    .then(user => {
      if (isEmpty(user)) {
        return Promise.reject(new Error('token error: user not available'))
      }

      return user
    })
    .catch(err => {
      console.error(err)
      return Promise.reject(err)
    })
}

module.exports = { makeToken, loadUser }
