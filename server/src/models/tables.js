const mongoose = require("mongoose");

const tablesSchema = new mongoose.Schema({
	table: {
		type: Number,
		unique: true,
	},
	available: Boolean,
});

module.exports = mongoose.model("tables", tablesSchema);
