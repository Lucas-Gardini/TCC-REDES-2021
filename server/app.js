// Baianisse
const colors = require("colors");

const express = require("express");
const bpJSON = require("body-parser").json();
const morgan = require("morgan");
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const host = require("localtunnel");

// Routes
const loginRoute = require("./src/routes/userRoute.js");
const productsRoute = require("./src/routes/productsRoute.js");
const requestsRoute = require("./src/routes/requestsRoute.js");
const tablesRoute = require("./src/routes/tablesRoute.js");

const app = express();
app.use(bpJSON);
app.use(cookies());
app.set("trust proxy", 1);
app.use(
	session({
		secret: "41cb99b1-22dd-41aa-8b27-33292b42612e",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
	})
);
app.use(
	cors({
		allowedHeaders: [
			"Content-Type",
			"Set-Cookie",
			"Access-Control-Allow-Origin",
			"Access-Control-Allow-Headers",
			"Allow-Origin",
			"Allowed-Methods",
		],
		origin: "*",
		methods: ["POST", "GET", "OPTIONS", "DELETE"],
	})
);
app.use(morgan("dev"));

const port = 8080;

// CORS
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

app.use("/public", express.static("./response_pages"));

// Using Routes
app.use("/user", loginRoute);
app.use("/products", productsRoute);
app.use("/requests", requestsRoute);
app.use("/tables", tablesRoute);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/orderify.html"));
});

app.get("**", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/404.html"));
});

app.listen(process.env.PORT || port, async () => {
	// console.log(" ⌛ Waiting for localtunnel");

	// const server = await host({ port: 8080, subdomain: "api-orderify" });
	// const websocket = await host({ port: 8081, subdomain: "ws-orderify" });
	// const mobile = await host({ port: 6924, subdomain: "app-orderify" });

	// const server_url = server.url;
	// const websocket_url = websocket.url;
	// const mobile_url = mobile.url;

	// console.log("-----------------------------");
	// console.log(` 🛅 Server hosting in ${server_url.yellow.bgBlack}`);
	// console.log(` 🔌 WebSocket hosting in ${websocket_url.yellow.bgBlack}`);
	// console.log(` 📱 Nuxt server listening in ${mobile_url.yellow.bgBlack}`);
	// console.log("-----------------------------");

	// server.on("open", () => {
	// 	console.log(`Server hosting in ${server_url}`);
	// });

	// websocket.on("open", () => {
	// 	console.log(`WebSocket hosting in ${websocket_url}`);
	// });

	// server.on("close", () => {
	// 	console.log("Server Crashed or Stopped");
	// });

	// websocket.on("close", () => {
	// 	console.log("WebSocket Crashed or Stopped");
	// });

	console.log(`SERVER STARTED`);
});
