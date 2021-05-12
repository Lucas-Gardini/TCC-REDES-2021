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
};

module.exports = productsController;
