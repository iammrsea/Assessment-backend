const { resolve } = require('path');

const createProduct = () => {
	return {
		productName: 'Men foot wears',
		productDescription: 'Original and exquisite men foot wears',
		productVarieties: [
			{
				price: 3000,
				size: 30,
				color: 'black',
				quantity: 20,
			},
		],
	};
};
const createProductUpdate = () => {
	return {
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
};
const createProductUpdateNoImage = () => {
	return {
		productName: 'Female wears',
		productDescription: 'Original and exquisite female foot wears',
		productVarieties: {
			price: 4000,
			size: 20,
			color: 'pink',
			quantity: 30,
		},
	};
};

module.exports = { createProduct, createProductUpdate, createProductUpdateNoImage };
