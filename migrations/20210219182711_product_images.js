exports.up = function (knex) {
	return knex.schema.createTable('product_images', (table) => {
		table.increments();
		table.string('file_id').notNullable();
		table.text('image_url').notNullable();
		table.timestamps(true);
	});
};

exports.down = function (knex) {
	return knex.schema.dropTable('product_images');
};
