const { requests, tables } = require("../models/index.js");

const requestsController = {
	async addRequest(req, res) {
		const { products, table_id, observations } = req.body;
		requests.findOne({ table_id, completed: false }, (err, doc) => {
			if (err) res.sendStatus(500).end();
			if (!doc) {
				requests.create(
					{
						table_id,
						products,
						observations,
						completed: false,
						date: Date.now(),
						created_by: req.session.auth.user_name,
						updated_by: "",
					},
					(err) => {
						if (err) {
							console.log(err);
							return res.sendStatus(500).end();
						}
						res.send("OK");
					}
				);
			} else {
				const updatedProducts = doc.products.concat(products);
				let updatedObservations = doc.observations || "";
				if (observations.length > 0) {
					updatedObservations = updatedObservations + "\n" + observations;
				}
				requests.updateOne(
					{ _id: doc._id },
					{
						products: updatedProducts,
						observations: updatedObservations,
						updated_by: req.session.auth.user_name,
					},
					(err) => {
						if (err) return res.sendStatus(500).end();
						res.send("OK");
					}
				);
			}
		});
	},
	async deleteRequest(req, res) {
		const request = req.body;
		await requests.deleteOne({ _id: req.params.id }, (err) => {
			if (err) res.sendStatus(500).end();
			else {
				res.sendStatus(200);
			}
		});
	},
	async finishRequest(req, res) {
		const request = req.body;
		console.log(request);
		await requests.updateOne(
			{ _id: request._id },
			{
				completed: true,
			},
			(err) => {
				if (err) res.sendStatus(500).end();
				res.sendStatus(200).end();
			}
		);
	},
	async getAllRequests(req, res) {
		const result = await requests.find().exec();
		let requestsWithTables = [];
		for (let request of result) {
			let table = await tables.findOne({ _id: request.table_id }).exec();
			let tableDoc = { ...table._doc };
			delete tableDoc._id;
			let request2 = { ...request._doc, tableDoc };
			requestsWithTables.push(request2);
		}
		res.json(requestsWithTables);
	},
	async getTodayRequests(req, res) {
		var start = new Date();
		var end = new Date();
		start.setHours(0, 0, 0, 0);
		end.setHours(23, 59, 59, 999);

		const result = await requests.find({ date: { $gte: start, $lt: end } }).exec();
		let requestsWithTables = [];
		for (let request of result) {
			let table = await tables.findOne({ _id: request.table_id }).exec();
			let tableDoc = { ...table._doc };
			delete tableDoc._id;
			let request2 = { ...request._doc, tableDoc };
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
	async getSells(req, res) {
		const currentYear = new Date().getFullYear();
		var firstDay = new Date(currentYear, 0, 1);
		var lastDay = new Date(currentYear, 11, 31);

		const thisYearRequests = await requests.find({ date: { $gte: firstDay, $lt: lastDay } }).exec();
		let months = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let monthsMoney = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		thisYearRequests.forEach((request) => {
			const monthIndex = new Date(request.date).getMonth();
			months[monthIndex] = months[monthIndex] + 1;

			request.products.forEach((product) => {
				monthsMoney[monthIndex] = monthsMoney[monthIndex] + product.quantity * product.price;
			});
		});
		res.json({ monthSellsQuantity: months, monthSellsMoney: monthsMoney });
	},
};

module.exports = requestsController;
