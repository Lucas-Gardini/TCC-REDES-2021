const { users } = require("../models/index.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userController = {
	async getAllUsers(req, res, next) {
		res.send(await users.find({}).exec());
	},
	async getUser(req, res, next) {
		console.log(users);
		const { user, password } = req.body;
		if (!(typeof req.session.auth !== "undefined") || !(req.session.auth !== null)) {
			try {
				const result = await users.find({ user: user }).exec();
				const hash = result[0].passwd;
				bcrypt.compare(password, hash, function (err, result_) {
					if (result_ === true) {
						req.session.auth = {
							loggedin: true,
							user_id: result[0]._id,
							user_name: result[0].user,
							user_function: result[0].function,
							is_adm: result[0].adm,
						};
						res.send("OK").end();
					} else {
						res.send("INVALID").end();
					}
				});
			} catch (e) {
				res.send("INVALID").end();
			}
		} else {
			res.send("ALREADY_LOGGED_IN").end();
		}
	},
	async getSession(req, res, next) {
		res.send(req.session.auth.is_adm);
	},
	async addUser(req, res) {
		// Encrypting Password
		bcrypt.genSalt(saltRounds, function (err, salt) {
			if (err) {
				console.log(err);
				res.sendStatus(500).end();
				return;
			}
			const { user, password, user_function, adm } = req.body;
			bcrypt.hash(password, salt, async function (err, hash) {
				await users.create({ user, passwd: hash, function: user_function, adm }, (err) => {
					console.log(err);
					if (err) res.sendStatus(500).end();
					else {
						res.sendStatus(200);
					}
				});
			});
		});
	},
	async deleteUser(req, res) {
		res.send(await users.collection.drop());
	},
	async logOffUser(req, res) {
		try {
			req.session.destroy();
			res.send({
				success: true,
			});
		} catch (e) {
			res.send({
				success: false,
			});
		}
	},
};

module.exports = userController;
