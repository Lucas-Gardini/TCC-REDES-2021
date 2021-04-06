const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
	table_id: String,
	products: Array,
	completed: Boolean,
	date: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("requests", requestsSchema);
