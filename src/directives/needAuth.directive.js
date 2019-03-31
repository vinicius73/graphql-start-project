const { isEmpty } = require('lodash')
const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')

class NeedAuthDiretive extends SchemaDirectiveVisitor {
  visitObject (type) {
    this.ensureFieldsWrapped(type)
    type._onlyAdmin = this.args.onlyAdmin
  }

  visitFieldDefinition (field, details) {
    this.ensureFieldsWrapped(details.objectType)
    field._onlyAdmin = this.args.onlyAdmin
  }

  ensureFieldsWrapped (objectType) {
    if (objectType._NeedAuthFieldsWrapped) {
      return
    }
    objectType._NeedAuthFieldsWrapped = true

    const fields = objectType.getFields()

    Object.values(fields)
      .forEach(field => {
        const { resolve = defaultFieldResolver } = field

        field.resolve = async function (...args) {
          const requiredAdmin = field._onlyAdmin || objectType._onlyAdmin

          if (requiredAdmin === undefined) {
            return resolve.apply(this, args)
          }

          const { user } = args[2]

          if (isEmpty(user)) {
            throw new Error('not authorized')
          }

          if (requiredAdmin === true && user.is_admin === false) {
            throw new Error('not authorized [only admin]')
          }

          return resolve.apply(this, args)
        }
      })
  }
}

module.exports = NeedAuthDiretive
