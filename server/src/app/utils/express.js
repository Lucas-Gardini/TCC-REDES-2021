class expressServer {
	constructor() {}

	start() {
		this.requireModules();
		this.instantiateApp();
		this.setRoutes();
		return this.app;
	}

	requireModules() {
		this.express = require("express");
		this.bpJSON = require("body-parser").json();
		this.morgan = require("morgan");
		this.session = require("express-session");
		this.cookies = require("cookie-parser");
		this.cors = require("cors");
		this.path = require("path");
		this.fs = require("fs");
		this.baianisse = require("chalk");
		this.createTable = require("ascii-table");
		this.serverConfig = require("./serverConfig.json");
	}

	instantiateApp() {
		this.app = this.express();
		this.app.use(this.bpJSON);
		this.app.use(this.cookies());
		this.app.set("trust proxy", 1);
		this.app.use(
			this.session({
				secret: "41cb99b1-22dd-41aa-8b27-33292b42612e",
				resave: false,
				saveUninitialized: false,
				cookie: { secure: false },
				name: "SessionId",
			})
		);

		const allowedOriginsTable = new this.createTable();
		allowedOriginsTable.setHeading("Origens Aceitas");

		let allowedOrigins = [];
		for (let obj of this.serverConfig.allowedHosts) {
			if (obj.host.indexOf("://") > 1) {
				allowedOrigins.push(obj.host);
				allowedOriginsTable.addRow(obj.host);
			} else {
				allowedOrigins.push("http://" + obj.host);
				allowedOriginsTable.addRow("http://" + obj.host);
			}
		}

		console.log(allowedOriginsTable.toString() + "\n");
		console.log(`? Modifique as origens no arquivo de configurações!\n`);

		// Log requester ip address

		// this.app.use((req, res, next) => {
		// 	console.log(req.ip);
		// 	next();
		// });

		this.app.use(
			this.cors({
				allowedHeaders: [
					"Content-Type",
					"Set-Cookie",
					"Access-Control-Allow-Origin",
					"Access-Control-Allow-Headers",
					"Allow-Origin",
					"Allowed-Methods",
				],
				origin: function (origin, callback) {
					if (allowedOrigins.indexOf(origin) !== -1) {
						callback(null, true);
					} else {
						if (origin) {
							return callback(console.log(`Access from a not allowed origin: ${origin}`));
						}
						return callback(null, true);
					}
				},
				methods: ["POST", "GET", "OPTIONS", "DELETE"],
				credentials: true,
			})
		);
		this.app.use(this.morgan("dev"));
	}

	setRoutes() {
		this.app.use("/public", this.express.static("./response_pages/"));

		// Routes
		const loginRoute = require("../../routes/userRoute.js");
		const productsRoute = require("../../routes/productsRoute.js");
		const requestsRoute = require("../../routes/requestsRoute.js");
		const tablesRoute = require("../../routes/tablesRoute.js");

		function authMiddleware(req, res, next) {
			if (req.baseUrl === "/user" && (req.url === "/get" || req.url === "/logoff")) {
				return next();
			}
			if (req.session.auth && req.session.auth.loggedin) {
				return next();
			}
			return res.sendStatus(401);
		}

		// Using Routes
		this.app.get("/", (req, res) => {
			res.redirect("/public");
		});

		this.app.use("/user", authMiddleware, loginRoute);
		this.app.use("/products", authMiddleware, productsRoute);
		this.app.use("/requests", authMiddleware, requestsRoute);
		this.app.use("/tables", authMiddleware, tablesRoute);

		this.app.get("/ping", (req, res) => {
			res.send("Pong!");
		});

		this.app.get("**", (req, res) => {
			res.redirect("/public");
		});
	}
}

module.exports = { expressServer };
