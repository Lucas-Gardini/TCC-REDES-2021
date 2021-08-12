const { requests, tables } = require("../models/index.js");

const requestsController = {
	async addRequest(req, res) {
		const { products, table_id, observations } = req.body;
		console.log(products);
		const create = await requests.create(
			{ table_id, products, observations, completed: false, date: Date.now() },
			(err) => {
				if (err) res.send(`Error code: ${err.code}`);
				else {
					res.send("OK");
				}
			}
		);
	},
	async getAllRequests(req, res) {
		const result = await requests.find().exec();
		let requestsWithTables = [];
		for (let request of result) {
			let table = await tables.findOne({ _id: request.table_id }).exec();
			let request2 = { ...request._doc, ...table._doc };
			requestsWithTables.push(request2);
		}
		res.json(requestsWithTables);
	},
	async getQuantity(req, res) {
		var start = new Date();
		start.setHours(0, 0, 0, 0);
		var end = new Date();
		end.setHours(23, 59, 59, 999);

		const today = await requests.find({ date: { $gte: start, $lt: end } }).exec();
		const all = await requests.find().exec();

		const allQuantity = all.length;
		const todayQuantity = today.length;
		res.json({ today: todayQuantity, all: allQuantity });
	},
};

module.exports = requestsController;
