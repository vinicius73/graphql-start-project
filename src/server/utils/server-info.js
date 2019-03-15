const { compose } = require('ramda')
const { pick, deburr, trim, omit } = require('lodash')
const { table } = require('table')
const { exec } = require('child_process')
const SERVER_VERSION = require('../../../package.json').version
const APOLLO_SERVER_VERSION = require('apollo-server/package.json').version

const sanitize = compose(deburr, trim, st => (st || '').replace('\n', ''))

const execPromise = (cmd) => new Promise((resolve, reject) => {
  exec(cmd, (err, output) => {
    if (err) {
      reject(err)
      return
    }
    resolve(output)
  })
})

const getGitInfo = baseDir => {
  const commands = [
    `cd ${baseDir} && git rev-parse HEAD`,
    `cd ${baseDir} && git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \\(.*\\)/ (\\1)/'`
  ]
  return Promise.all(commands.map(execPromise))
    .then(result => {
      const [GIT_COMMIT_HASH, GIT_BRANCH] = result.map(sanitize)
      return { GIT_COMMIT_HASH, GIT_BRANCH }
    })
    .catch(err => {
      console.warn(
        'fail to get git info',
        err.message
      )

      return {
        GIT_COMMIT_HASH: 'Unknown',
        GIT_BRANCH: 'Unknown'
      }
    })
}

const getNodeInfo = () => {
  const data = pick(process, ['platform', 'pid', 'title'])
  data.node_version = process.version

  return data
}

const getServerInfo = (config, httpServer) => {
  return getGitInfo(config.SERVER_BASE_DIR)
    .then(git => {
      return Object.assign(
        { now: new Date() },
        pick(config, ['SERVER_NAME', 'NODE_ENV']),
        pick(process.env, ['PM2_USAGE', 'USER']),
        { 'config.env': JSON.stringify(config.env) },
        { SERVER_VERSION, APOLLO_SERVER_VERSION },
        omit(httpServer, ['server']),
        getNodeInfo(),
        git
      )
    })
}

const showServerInfo = (config, server) => {
  return getServerInfo(config, server)
    .then(info => {
      const rows = Object.keys(info)
        .reduce((acc, key) => {
          acc.push([key, info[key]])
          return acc
        }, [])

      console.info(table([
        ['key', 'value'],
        ...rows
      ]))
    })
    .catch(err => {
      console.error({
        message: 'fail to get server info',
        err
      })
    })
}

module.exports = { showServerInfo, getServerInfo }
