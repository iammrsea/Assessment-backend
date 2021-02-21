const database = require('../../config/database');

class ProductImages {
	static create({ fileId, url }) {
		return database('product_images').insert({ file_id: fileId, image_url: url });
	}
	static createMany(images) {
		return database('product_images').insert(images);
	}
	static delete(id) {
		return database('products_images').where('id', id).del();
	}
	static findAll() {
		return database.select().from('products_images');
	}
	static findById(id) {
		return database('products_images').where('id', id);
	}
	static async findByUrl(url) {
		try {
			const image = await database('products_images').where('image_url', url);
			return { ...image };
		} catch (error) {
			throw error;
		}
	}
}
module.exports = ProductImages;
