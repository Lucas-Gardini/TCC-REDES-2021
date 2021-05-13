const mongoose = require("mongoose");
const env = require("../../env.json");
const ws = require("ws");

const url = `mongodb+srv://${env.MONGO_USR}:${env.MONGO_PWD}@tcc-api-data.vtvfp.mongodb.net/${env.MONGO_DB}?retryWrites=true&w=majority`;

mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});

const userModel = require("./user.js");
const productsModel = require("./products.js");
const requestsModel = require("./requests.js");
const tablesModel = require("./tables.js");

console.log("-----------------------------");
console.log(" 🛠 Starting WebSocket Server");

const Server = new ws.Server({
	port: 8081,
});

var connections = [];

Server.on("listening", () => {
	console.log(" ✔ WebSocket Server Running");
	console.log("-----------------------------");
});

Server.on("connection", (conn) => {
	connections.push(conn);
	conn.on("close", () => {
		const index = connections.indexOf(conn);
		if (index > -1) {
			connections.splice(index, 1);
		}
	});
	console.log(connections.length);
});

userModel.watch().on("change", (change) => {
	console.log("Database changed: " + "user");
	for (let conn in connections) {
		connections[conn].send("user");
	}
});
productsModel.watch().on("change", (change) => {
	console.log("Database changed: " + "products");
	for (let conn in connections) {
		connections[conn].send("products");
	}
});
requestsModel.watch().on("change", (change) => {
	console.log("Database changed: " + "requests");
	for (let conn in connections) {
		connections[conn].send("requests");
	}
});
tablesModel.watch().on("change", (change) => {
	console.log("Database changed: " + "tables");
	for (let conn in connections) {
		connections[conn].send("tables");
	}
});

module.exports = mongoose.models;
