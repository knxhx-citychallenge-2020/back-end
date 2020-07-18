module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost:5433',
      user : '[db_username]',
      password : '[db_password]',
      database : 'knxhx'
    },
    migrations: {
      directory: __dirname + '/knex/migrations',
    },
    seeds: {
      directory: __dirname + '/knex/seeds'
    }
  }
}