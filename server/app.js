const express = require("express");
const bpJSON = require("body-parser").json();
const morgan = require("morgan");
const session = require("express-session");
const cookies = require("cookie-parser");
const path = require("path");
// Routes
const loginRoute = require("./src/routes/userRoute.js");

const app = express();
app.use(bpJSON);
app.use(cookies());
app.use(
	session({
		secret: "41cb99b1-22dd-41aa-8b27-33292b42612e",
		resave: false,
		saveUninitialized: false,
	})
);

app.use(morgan("dev"));

const port = 8080;

app.use("/public", express.static("./response_pages"));

// Using Routes
app.use("/user", loginRoute);

app.post("/", (req, res) => {
	console.log(req.session);
});

app.get("**", (req, res) => {
	res.sendFile(path.join(__dirname, "/response_pages/404.html"));
});

app.listen(process.env.PORT || port, () => {
	console.log(`Server listening in port ${process.env.PORT || port}`);
});
