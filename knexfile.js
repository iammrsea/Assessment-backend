// Update with your config settings.

module.exports = {
	development: {
		client: 'mysql',
		connection: {
			database: 'vasiti_test',
			user: 'root',
			password: '',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},

	production: {
		client: 'mysql',
		connection: {
			database: 'vasiti_test',
			user: 'root',
			password: 'password',
		},
		pool: {
			min: 2,
			max: 10,
		},
		migrations: {
			tableName: 'knex_migrations',
		},
	},
};
