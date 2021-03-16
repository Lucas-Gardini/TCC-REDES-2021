const mongoose = require("mongoose");

const requestsSchema = new mongoose.Schema({
	table_id: Number,
	completed: Boolean,
	date: Date,
});

module.exports = mongoose.model("requests", requestsSchema);
