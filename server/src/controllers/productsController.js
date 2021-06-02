const { products } = require("../models/index.js");

const productsController = {
	async addProduct(req, res) {
		const { name, price, ingredients, available } = req.body;
		const create = await products.create({ name, price, ingredients, available }, (err) => {
			if (err) res.send(`Error code: ${err.code}`);
			else {
				res.send(create);
			}
		});
	},
	async getAllProducts(req, res) {
		const result = await products.find().exec();
		res.json(result);
	},
	async getQuantity(req, res) {
		try {
			if (req.session.auth.loggedin === true) {
				const result = await products.find().exec();
				res.send(`${result.length}`);
			} else {
				res.sendStatus(403);
			}
		} catch (err) {
			console.log(err);
			res.sendStatus(418);
		}
	},
	async updateProduct(req, res) {
		const product = req.body.product;
		await products.updateOne(
			{ _id: product },
			{
				name: product.name,
				price: product.price,
				ingredients: product.ingredients,
				available: product.available,
			},
			(err) => {
				if (err) res.sendStatus(500).end();
				res.sendStatus(200).end();
			}
		);
	},
	async delProduct(req, res) {
		await products.deleteOne({ _id: req.params.id }, (err) => {
			if (err) res.sendStatus(500).end();
			else {
				res.sendStatus(200);
			}
		});
	},
};

module.exports = productsController;
