const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	//name: String,
	user: {
		type: String,
		unique: true,
	},
	passwd: String,
	function: Number || null, // 0 -> client (wip), 1 -> waiter, 2-> Chef
	adm: Boolean,
});

module.exports = mongoose.model("users", usersSchema);
