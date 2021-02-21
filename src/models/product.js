const database = require('../../config/database');

class Product {
	static create({ productName, productDescription, productVarieties = {} }) {
		return database('products').insert(
			{
				product_name: productName,
				product_description: productDescription,
				product_varieties: JSON.stringify(productVarieties),
			},
			['id']
		);
	}
	static update(id, { productName, productDescription, productVarieties }) {
		return database('products')
			.where('id', id)
			.update({
				product_name: productName,
				product_description: productDescription,
				product_varieties: JSON.stringify(productVarieties),
			});
	}
	static delete(id) {
		return database('products').where('id', id).del();
	}
	static async findAll() {
		try {
			const products = await database.select().from('products');
			const serialized = products.map((product) => ({
				...product,
				product_varieties: JSON.parse(product.product_varieties),
			}));
			return serialized;
		} catch (error) {
			throw error;
		}
	}
	static async findById(id) {
		try {
			const product = await database('products').where('id', id).first();
			return { ...product, product_varieties: JSON.parse(product.product_varieties) };
		} catch (error) {
			throw error;
		}
	}
}
module.exports = Product;
