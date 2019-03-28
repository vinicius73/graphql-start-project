const bcrypt = require('bcrypt')
const { isEmpty } = require('lodash')
const makeError = () => Promise.reject(new Error('Invalid User/Password combination'))

const loadUser = (db, email) => db('users')
  .select(['id', 'email', 'password'])
  .where({ email })
  .first()
  .then(row => {
    if (isEmpty(row)) {
      return makeError()
    }

    return row
  })

const assetPassword = (data, encripted) => {
  return bcrypt.compare(data, encripted)
    .then(isMatch => {
      if (isMatch) {
        return
      }

      return makeError()
    })
}

const attempt = async (db, email, password) => {
  const user = await loadUser(db, email)

  // compare password
  await assetPassword(password, user.password)

  return user
}

module.exports = { attempt }
