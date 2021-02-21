const router = require('express').Router();
const multer = require('multer')();
const Product = require('../models/product');
const ProductImage = require('../models/productImages');
const ImageService = require('../services/imageService');

router
	.all('/api/v1/images')
	.delete('/:imageUrl/:productId', async (req, res, next) => {
		try {
			const { imageUrl, productId } = req.params;
			const image = await ProductImage.findByUrl(imageUrl);
			await ProductImage.delete(image.id);
			const product = await Product.findById(productId);
			const productName = product.product_name;
			const productDescription = product.product_description;
			const productVarieties = { ...product.product_varieties, images: productImages };
			await Product.update(id, { productDescription, productName, productVarieties });
			return res.json({ status: true, message: 'Product image was successfully deleted' });
		} catch (error) {
			next(error);
		}
	})
	.post('/', multer.single('image'), async (req, res, next) => {
		try {
			const { file } = req;
			const image = { file: file.buffer, fileName: file.originalname };

			let result = await ImageService.uploadImage(image);
			result = { fileId: result.fileId, url: result.url };
			await ImageService.saveToDatabase(result);
			return res.json({
				status: true,
				message: 'Product image was created successfully',
				data: { image_url: result.url },
			});
		} catch (error) {
			next(error);
		}
	});
module.exports = router;
