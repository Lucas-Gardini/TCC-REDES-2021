const { users } = require("../models/index.js");
const bcrypt = require("bcrypt");

const saltRounds = 10;

const userController = {
	async getAllUsers(req, res) {
		res.send(await users.find({}).exec());
	},
	async getUser(req, res, next) {
		const { user, password } = req.body;
		await Object.assign(req.session, {
			auth: {
				user,
				password,
			},
		});
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
	},
	async getSession(req, res, next) {
		res.send(`Session after login: ${JSON.stringify(req.session.id)}`);
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
		//res.send(await users.collection.drop());
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
