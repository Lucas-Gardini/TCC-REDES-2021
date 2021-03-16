const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
	price: Number,
	ingredients: Array,
	available: Boolean,
});

module.exports = mongoose.model("products", productsSchema);
