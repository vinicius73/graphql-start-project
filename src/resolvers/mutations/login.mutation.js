const LoginMutation = async (root, { email, password }, { services }) => {
  const { auth } = services
  const user = await auth.attempt(email, password)

  return auth.makeToken(user)
}

module.exports = LoginMutation
