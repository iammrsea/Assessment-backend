const test = require('japa');
const supertest = require('supertest');
const { resolve } = require('path');
const { createProduct } = require('../helpers');

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}/api/v1/`;

test.group('products tests', () => {
	let productId;
	let imageUrl;

	test('POST /images => Creates new product image', async (assert) => {
		const request = supertest(BASE_URL)
			.post('images')
			.set('Content-Type', 'multipart/form-data')
			.accept('application/json');

		//Attach images
		request.attach(`image`, resolve(__dirname, '../images/product3.jpeg'));

		const { body } = await request.expect(200);
		const { status, data } = body;
		imageUrl = data.image_url;
		assert.isBoolean(status);
	});
	test('POST /images => Creates another new product image', async (assert) => {
		const request = supertest(BASE_URL)
			.post('images')
			.set('Content-Type', 'multipart/form-data')
			.accept('application/json');

		//Attach images
		request.attach(`image`, resolve(__dirname, '../images/product1.jpg'));

		const { body } = await request.expect(200);
		const { status } = body;
		assert.isBoolean(status);
	});

	test('POST /products => Creates new product', async (assert) => {
		const product = createProduct();
		const { body } = await supertest(BASE_URL)
			.post('products')
			.set('Content-Type', 'application/json')
			.send({ ...product, productVarieties: [{ ...product.productVarieties[0], images: [imageUrl] }] })
			.accept('application/json')
			.expect(200);

		const { status, data } = body;
		productId = data.product_id;
		assert.isBoolean(status);
		assert.hasAllKeys(body, ['status', 'data', 'message']);
	});
	test('PUT /products/:id => Updates product by id', async (assert) => {
		const product = {
			productName: 'Female wears',
			productDescription: 'Original and exquisite female foot wears',
			productVarieties: [
				{
					price: 4000,
					size: 20,
					color: 'pink',
					quantity: 30,
				},
			],
		};
		const {
			body: {
				data: { product_varieties },
			},
		} = await supertest(BASE_URL)
			.get('products/' + productId)
			.accept('application/json')
			.expect(200);
		const id = product_varieties[0].id;
		const { body } = await supertest(BASE_URL)
			.put('products/' + productId)
			.set('Content-Type', 'application/json')
			.send({
				...product,
				productVarieties: [{ id, ...product.productVarieties[0], images: [imageUrl] }],
			})
			.accept('application/json')
			.expect(200);

		const { status } = body;
		assert.isBoolean(status);
	});

	test('GET /products => Returns all products in the db', async (assert) => {
		const { body } = await supertest(BASE_URL).get('products').accept('application/json').expect(200);
		const { status, data } = body;
		console.dir(data, { depth: null });
		assert.isBoolean(status);
		assert.isArray(data);
		assert.hasAllKeys(body, ['status', 'message', 'data']);
	});
});
