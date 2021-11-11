const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
	table_id: String,
	products: Array,
	observations: String,
	completed: Boolean,
	date: { type: Date, default: Date.now() },
	created_by: String,
	updated_by: { type: String, default: null },
});

module.exports = mongoose.model("requests", requestsSchema);
