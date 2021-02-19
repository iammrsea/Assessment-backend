exports.up = function (knex) {
	return knex.schema.createTable('products', (table) => {
		table.increments();
		table.string('product_name').notNullable();
		table.text('product_description').notNullable();
		table.json('product_varieties');
		table.timestamp('date_uploaded').defaultTo(knex.fn.now());
		table.timestamp('date_edited').defaultTo(knex.fn.now());
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('products');
};
