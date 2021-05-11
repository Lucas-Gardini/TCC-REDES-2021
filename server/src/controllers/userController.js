const { users } = require("../models/index.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userController = {
	async getAllUsers(req, res, next) {
		res.send(await users.find({}).exec());
	},
	async getUser(req, res, next) {
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
		res.send(`Session after login: ${JSON.stringify(req.session.auth)}`);
	},
	async addUser(req, res) {
		// Encrypting Password
		bcrypt.genSalt(saltRounds, function (err, salt) {
			bcrypt.hash("admin", salt, async function (err, hash) {
				const create = await users.create(
					{ user: "admin", passwd: hash, function: null, adm: true },
					(err) => {
						if (err) res.send(`Error code: ${err.code}`);
						else {
							res.send(create);
						}
					}
				);

				console.log(hash);
			});
		});
	},
	async deleteUser(req, res) {
		res.send(await users.collection.drop());
	},
	async logoffUser(req, res) {
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
