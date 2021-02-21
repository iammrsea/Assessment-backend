// // const express = require('express');
// // require('dotenv').config();
// // const Product = require('./models/product');
// // const { productController } = require('./controllers');

// // const app = express();

// // app.use(express.json());

// // app.use('/api/v1/products', productController);
// // // app.get('/', async (req, res) => {
// // // 	try {
// // // 		const id = await Product.create({
// // // 			productName: 'Electric fan',
// // // 			productDescription: 'Original electric fan',
// // // 			productVarieties: { size: 12, color: 'red', price: 2990 },
// // // 		});
// // // 		return res.json({ id });
// // // 	} catch (error) {
// // // 		console.log(error);
// // // 		return res.status(400).json({ message: error.message });
// // // 	}
// // // });
// // console.log(process.env.IMAGEKIT_ID);
// // app.use((err, req, res, next) => {
// // 	res.status(500).json({ error: err.message });
// // });

// // app.listen(3000, () => {
// // 	console.log('Server listening at port 3000');
// // });
// const Server = require

const Server = require('./app');

Server.registerMiddleware().startHttpServer((port) => {
	console.log('Server started at port ', port);
});
