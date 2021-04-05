const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
	name: String,
	price: Number,
	ingredients: Array,
	available: Boolean,
});

module.exports = mongoose.model("products", productsSchema);
