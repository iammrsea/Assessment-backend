const router = require('express').Router();
const Product = require('../models/product');
const { nanoid } = require('nanoid');

router
	.all('/api/v1/products')
	.get('/', async (req, res, next) => {
		try {
			const products = await Product.findAll();
			return res.json({ status: true, message: 'Products fetched successfully', data: products });
		} catch (error) {
			next(error);
		}
	})
	.get('/:id', async (req, res, next) => {
		try {
			const { id } = req.params;
			const product = await Product.findById(id);
			return res.json({
				status: true,
				message: 'Product fetched successfully',
				data: { ...product },
			});
		} catch (error) {
			next(error);
		}
	})
	.delete('/:id', async (req, res, next) => {
		try {
			const { id } = req.params;
			await Product.delete(id);
			return res.json({ status: true, message: 'Product successfully deleted' });
		} catch (error) {
			next(error);
		}
	})
	.put('/:id', async (req, res, next) => {
		try {
			const {
				body,
				params: { id },
			} = req;

			//Assign ids to new varieties
			const varieties = body.productVarieties || [];
			const productVarieties = varieties.map((variety) => {
				if ('id' in variety) return variety;
				return { ...variety, id: nanoid() };
			});
			await Product.update(id, { ...body, productVarieties });
			return res.json({ status: true, message: 'Product was updated successfully' });
		} catch (error) {
			next(error);
		}
	})
	.post('/', async (req, res, next) => {
		try {
			const { body } = req;
			//Add ids to each product varieties;
			const variants = body.productVarieties.map((variant) => ({ ...variant, id: nanoid() }));
			const product = {
				...body,
				productVarieties: [...variants],
			};
			const id = await Product.create(product);
			return res.json({
				status: true,
				message: 'Product was created successfully',
				data: { product_id: id[0], ...product },
			});
		} catch (error) {
			next(error);
		}
	});
module.exports = router;
