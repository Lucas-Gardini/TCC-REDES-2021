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
};

module.exports = tablesController;
