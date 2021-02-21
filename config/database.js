const knex = require('knex');
const database = knex({
	client: 'mysql',
	connection: {
		host: '127.0.0.1',
		user: 'root',
		password: '',
		database: 'vasiti_test',
	},
});

module.exports = database;
