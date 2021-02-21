const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { productController, productImageController } = require('./controllers');

const app = express();

app.use(express.json());

class VasitiTestApp {
	constructor() {
		this._app = express();
		this._port = 3333;
	}
	registerMiddleware() {
		this._app.use(express.json());
		this._app.use(cors());
		this._app.use('/api/v1/products', productController);
		this._app.use('/api/v1/images', productImageController);
		this._app.use((err, req, res, next) => {
			console.log('error', err);
			res.status(500).json({ message: err.message });
		});
		return this;
	}
	startHttpServer(callback) {
		return new Promise((resolve) => {
			this._app.listen(process.env.PORT || this._port, () => {
				callback && callback(this._port);
				resolve();
			});
		});
	}
}
module.exports = new VasitiTestApp();
