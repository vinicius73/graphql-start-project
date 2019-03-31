const { SchemaDirectiveVisitor } = require('apollo-server')
const { defaultFieldResolver } = require('graphql')
const objectHash = require('object-hash')

const makePrefix = ({ prefix = 'graphql' }, field, details) => {
  const { objectType } = details
  const { name } = field

  return `${prefix}:${objectType}:${name}`
}

const makeHash = (root, args) => objectHash({ root, args })
const makeKey = (prefix, root, args) => {
  const hash = makeHash(root, args)

  return `${prefix}:${hash}`
}

class CacheDiretive extends SchemaDirectiveVisitor {
  visitFieldDefinition (field, details) {
    const { ttl } = this.args
    const { resolve = defaultFieldResolver } = field
    const prefix = makePrefix(this.args, field, details)

    field.resolve = function (...resolveArgs) {
      const [root, args, context] = resolveArgs
      const key = makeKey(prefix, root, args)

      // call original resolver
      const loader = () => resolve.apply(field, resolveArgs)

      return context
        .services
        .cache
        .wrap(key, loader, { ttl })
    }
  }
}

module.exports = CacheDiretive
