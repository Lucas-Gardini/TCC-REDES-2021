// Baianisse
const colors = require("colors");

const express = require("express");
const bpJSON = require("body-parser").json();
const morgan = require("morgan");
const session = require("express-session");
const cookies = require("cookie-parser");
const cors = require("cors");
const path = require("path");
// const host = require("localtunnel");

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
		origin: ["http://localhost:8082", "http://localhost:2469"],
		methods: ["POST", "GET", "OPTIONS", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("dev"));

const port = 8080;

app.use("/public", express.static("./response_pages"));
app.use("/app", express.static("./requests_app"));

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
	console.log(`SERVER STARTED at port ${process.env.PORT || port}`);
});
