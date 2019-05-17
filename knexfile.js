module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './data/lambda.db3'
    },
    useNullAsDefault: true,
    

    migrations: {
      directory: './data/migrations'
    },
  
    seeds: {
      directory: './data/seeds'
    },

  },

  pool: {
    afterCreate: (connection, done) => {
      connection.run('PRAGMA foreign_keys = ON', done)
    }
  },
};