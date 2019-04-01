# GraphQL Start Project
A project with opinionated architecture that is used as the basis for new projects.

## Requirements
Resources that must be installed for this project to work.

- [node v10+](https://nodejs.org/en/download/)
- [yarn v1.15+](https://yarnpkg.com/lang/en/docs/install/#debian-stable)
- [docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

## Stack
Primary libs and resources used in this project

- [Apollo Server](https://github.com/apollographql/apollo-server)
- [knex](https://knexjs.org/)
- [awilix](https://github.com/jeffijoe/awilix)
- [node-config](https://github.com/lorenwest/node-config)
- [dotenv](https://github.com/motdotla/dotenv)
- [pm2](https://pm2.io/doc/en/runtime/overview/)
- [PostgreSQL](https://www.postgresql.org/)
- [Redis](https://redis.io/)

### Commit tool
This project use [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) for commit messages

## Project structure

```
src
├── directives
│   └── *.directive.js
├── index.js
├── resolvers
│   ├── fields // fields resolvers
│   ├── mutations // mutation resolvers
│   └── resources.js // for auto ganeration
├── server // server builder
├── services
│   ├── factories // services factories
│   └── index.js
├── type-defs
│   └── *.graphql
└── utils

```

## Running project
This project uses docker-compose to upload all the services it depends on to work.

## Environments
Copy `.env.example` to `.env` 

```shell
cp .env.example .env
```

> **APP_KEY** is very important. All tokens use this env. Do not change in production.

See `config/default.js` for more info.

### dev mode
Up service with auto reload when change source files

```shell
yarn run docker:dev
```

The graphql server will bi aveilable in `http://localhost:7373` by default, see PORT env for confirmation.

When docker up in dev mode, follow below commands will run.

```shell
yarn run knex:migrate
yarn run knex:seed
```

This commands configure and populate the database.

See `package.json > scripts` for more info.

> If You need run commands inside container use `yarn run docker:dev:exec sh`

#### pgadmin4
When run project in development mode, pgadmin4 will be available in `http://localhost:16543`
Use `local@local.dev` and value of `DB_PASSWORD` to access pgadmin4

### prod mode
Up to 2 pm2 service in cluster mode.

```shell
yarn run docker:dev
```