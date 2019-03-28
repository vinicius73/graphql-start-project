const jwt = require('jsonwebtoken')

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

module.exports = { makeToken }
