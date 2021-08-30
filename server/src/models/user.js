const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
	user: {
		type: String,
		unique: true,
	},
	passwd: String,
	function: String || null,
	adm: Boolean,
});

module.exports = mongoose.model("users", usersSchema);
