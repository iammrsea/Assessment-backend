const ImageKit = require('imagekit');
const ImageModel = require('../models/productImages');

class ImageService {
	constructor() {
		const uploader = new ImageKit({
			publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
			privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
			urlEndpoint: 'https://ik.imagekit.io/' + process.env.IMAGEKIT_ID,
		});
		this._uploader = uploader;
	}

	uploadImage({ file, fileName }) {
		return new Promise((resolve, reject) => {
			this._uploader.upload(
				{
					file,
					fileName,
				},
				(error, result) => {
					if (error) reject(error);
					resolve(result);
				}
			);
		});
	}
	deleteImage(fileId) {
		return new Promise((resolve, reject) => {
			this._uploader.deleteFile(fileId, (error, result) => {
				if (error) reject(error);
				resolve(result);
			});
		});
	}
	saveToDatabase(image) {
		return ImageModel.create({ ...image });
	}
	saveManyToDatabase(images) {
		return ImageModel.createMany(images);
	}
}

module.exports = new ImageService();
