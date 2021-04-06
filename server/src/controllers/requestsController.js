const { requests } = require("../models/index.js");

const requestsController = {
	async addRequest(req, res) {
		const { products, table_id } = req.body;
		const create = await requests.create({ table_id, products, completed: false }, (err) => {
			if (err) res.send(`Error code: ${err.code}`);
			else {
				res.send("OK");
			}
		});
	},
	async getAllRequests(req, res) {
		const result = await requests.find().exec();
		res.json(result);
	},
};

module.exports = requestsController;
