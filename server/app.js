// Baianisse
const colors = require("colors");
const { createServer } = require("http");
const express = require("express");
const bpJSON = require("body-parser").json();
const morgan = require("morgan");
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
// const host = require("localtunnel");

// Routes
const loginRoute = require("./src/routes/userRoute.js");
const productsRoute = require("./src/routes/productsRoute.js");
const requestsRoute = require("./src/routes/requestsRoute.js");
const tablesRoute = require("./src/routes/tablesRoute.js");

const app = express();

const server = createServer(app);

app.use(bpJSON);
app.use(cookies());
app.set("trust proxy", 1);
app.use(
	session({
		secret: "41cb99b1-22dd-41aa-8b27-33292b42612e",
		resave: false,
		saveUninitialized: false,
		cookie: { secure: false },
		name: "SessionId",
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
		credentials: true,
	})
);
app.use(morgan("dev"));

const port = 8080;

app.use("/public", express.static("./response_pages"));
app.use("/app", express.static("./requests_app"));

function authMiddleware(req, res, next) {
	if (req.baseUrl === "/user" && (req.url === "/get" || req.url === "/logoff")) {
		return next();
	}
	if (req.session.auth && req.session.auth.loggedin) {
		return next(); // Você é obrigado a chamar o next()
	}
	return res.sendStatus(401);
}

// Using Routes
app.use("/user", authMiddleware, loginRoute);
app.use("/products", authMiddleware, productsRoute);
app.use("/requests", authMiddleware, requestsRoute);
app.use("/tables", authMiddleware, tablesRoute);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/orderify.html"));
});

app.get("/ping", (req, res) => {
	res.send("Pong!");
});

app.get("**", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/404.html"));
});

server.listen(8080, process.env.SERVER_IP, () => {
	console.log(`SERVER STARTED at port ${process.env.PORT || port}`);
});
