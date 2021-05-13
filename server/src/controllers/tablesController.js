const { tables } = require("../models/index.js");

const tablesController = {
	async addTable(req, res) {
		const { table, available } = req.body;
		const create = await tables.create({ table, available }, (err) => {
			if (err) res.send(`Error code: ${err.code}`);
			else {
				res.send(create);
			}
		});
	},
	async getAlltables(req, res) {
		const result = await tables.find().exec();
		res.json(result);
	},
	async getQuantity(req, res) {
		const result = await tables.find().exec();
		const quantity = result.length;
		let available = 0;
		for (table of result) {
			if (table.available === true) {
				available++;
			}
		}
		res.send([quantity, available]);
	},
};

module.exports = tablesController;
