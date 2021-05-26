const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const url = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@tcc-api-data.vtvfp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

require("./user");
require("./products");
require("./requests");
require("./tables");

console.log(mongoose.models);

module.exports = mongoose.models;
