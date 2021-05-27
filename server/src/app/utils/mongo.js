const baianisse = require("chalk");
const ora = require("ora");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });

class mongoDB {
	constructor(websocket) {
		this.ws = websocket;
		this.connections = [];
		this.start();
	}

	start() {
		this.ws.on("connection", (conn) => {
			console.log(baianisse.cyan("Alguem se conectou ao WebSocket!"));
			this.connections.push(conn);
			conn.on("close", () => {
				console.log(
					baianisse.red(
						`O WebSocket '${this.connections.indexOf(conn)}' se desconectou!'`
					)
				);
				const index = this.connections.indexOf(conn);
				if (index > -1) {
					this.connections.splice(index, 1);
				}
			});
		});

		const userModel = require("../../models/user");
		const productsModel = require("../../models/products");
		const requestsModel = require("../../models/requests");
		const tablesModel = require("../../models/tables");

		userModel.watch().on("change", (change) => {
			console.log("Database changed: " + "user");
			for (let conn in this.connections) {
				this.connections[conn].send("user");
			}
		});
		productsModel.watch().on("change", (change) => {
			console.log("Database changed: " + "products");
			for (let conn in this.connections) {
				this.connections[conn].send("products");
			}
		});
		requestsModel.watch().on("change", (change) => {
			console.log("Database changed: " + "requests");
			for (let conn in this.connections) {
				this.connections[conn].send("requests");
			}
		});
		tablesModel.watch().on("change", (change) => {
			console.log("Database changed: " + "tables");
			for (let conn in this.connections) {
				this.connections[conn].send("tables");
			}
		});
	}
}

module.exports = { mongoDB };
