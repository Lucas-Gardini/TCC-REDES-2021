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
	cors({ allowedHeaders: ["Content-Type", "Set-Cookie"], origin: "*", methods: ["POST", "GET"] })
);
app.use(morgan("dev"));

const port = 8080;

app.use("/public", express.static("./response_pages"));

// Using Routes
app.use("/user", loginRoute);
app.use("/products", productsRoute);
app.use("/requests", requestsRoute);
app.use("/tables", tablesRoute);

app.post("/", (req, res) => {
	console.log(req.session);
});

app.get("**", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/404.html"));
});

app.listen(process.env.PORT || port, async () => {
	console.log("\u001b[35mTying to start server...");
	const tunnel = await host({ port: 8080, subdomain: "orderify" });

	url = tunnel.url;
	console.log(`Hosting in ${url}\u001b[37m`);

	tunnel.on("open", () => {
		console.log("\u001b[36mStarted server\u001b[37m");
	});

	tunnel.on("close", () => {
		console.log("\u001b[31mServer Crashed or Stopped\u001b[37m");
	});
	console.log(`Server listening in port ${process.env.PORT || port}`);
});
