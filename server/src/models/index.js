const baianisse = require("chalk");
const ora = require("ora");
const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../../.env") });
const url = `mongodb+srv://${process.env.MONGO_USR}:${process.env.MONGO_PWD}@tcc-api-data.vtvfp.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`;

const databaseLoader = ora("Conectando ao banco de dados").start();
mongoose.connect(url, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true,
});
databaseLoader.succeed(
	`Conexão com o Banco de Dados realizada com ${baianisse.greenBright("sucesso")}!`
);

const modelsLoader = ora("Carregando os modelos do banco de dados").start();
require("./user");
require("./products");
require("./requests");
require("./tables");
modelsLoader.succeed(`Modelos do Banco carregados com ${baianisse.greenBright("sucesso")}!\n`);

module.exports = mongoose.models;
