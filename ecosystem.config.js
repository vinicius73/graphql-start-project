module.exports = {
  apps: [{
    name: 'graphql-server',
    script: './src/index.js',
    ignore_watch: ['node_modules', 'data', '.git', '*.log'],
    env: {
      NODE_ENV: 'development'
    },
    env_production: {
      NODE_ENV: 'production'
    }
  }]
}
