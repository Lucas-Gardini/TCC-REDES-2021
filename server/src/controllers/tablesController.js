const { tables } = require("../models/index.js");

const tablesController = {
	async addTable(req, res) {
		const { table, available } = req.body;
		await tables.create({ table, available }, (err) => {
			if (err) res.sendStatus(500).end();
			else {
				res.sendStatus(200);
			}
		});
	},
	async getAlltables(req, res) {
		const result = await tables.find().exec();
		res.json(result);
	},
	async getTableById(req, res) {
		const result = await tables.findOne({ _id: req.params.id }).exec();
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
	async deleteTable(req, res) {
		await tables.deleteOne({ _id: req.params.id }, (err) => {
			if (err) res.sendStatus(500).end();
			else {
				res.sendStatus(200);
			}
		});
	},
	async changeAvailability(req, res) {
		await tables.updateOne({ _id: req.params.id }, { available: req.body.available }, (err) => {
			if (err) res.sendStatus(500).end();
			else {
				res.sendStatus(200);
			}
		});
	},
};

module.exports = tablesController;
