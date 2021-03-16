const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const url = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@tcc-api-data.vtvfp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const userModel = require("./user.js");
const productsModel = require("./products.js");
const requestsModel = require("./requests.js");

console.log(`Database tables:`, mongoose.models);

module.exports = mongoose.models;
