const knex = require('knex');
const database = knex({
	client: 'mysql',
	connection: {
		host: process.env.DB_HOST || '127.0.0.1',
		user: process.env.DB_USERNAME || 'root',
		password: process.env.DB_PASSWORD || '',
		database: process.env.DB_NAME || 'vasiti_test',
	},
});

module.exports = database;
