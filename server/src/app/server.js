const baianisse = require("chalk");
const ora = require("ora");
const networkSelector = require("./utils/networkSelector");
const httpServer = require("http").createServer();
const websocket = require("ws");
const { expressServer } = require("./utils/express");
const { mongoDB } = require("./utils/mongo");

async function start() {
	const serverAddress = await networkSelector.select();
	const server = new expressServer().start();

	const wsLoader = ora("Iniciando Websocket").start();
	const serverLoader = ora("Iniciando Servidor").start();
	const ws = new websocket.Server({
		server: httpServer,
	});

	ws.on("listening", () => {
		wsLoader.succeed(
			`Websocket Iniciado no endereço: ${baianisse.cyan(
				`ws://${serverAddress.ip}:${serverAddress.port}`
			)}\n`
		);
	});

	new mongoDB(ws);

	httpServer.on("request", server);
	serverLoader.succeed(
		`Servidor Iniciado no endereço: ${baianisse.cyan(
			`http://${serverAddress.ip}:${serverAddress.port}`
		)}\n`
	);
	httpServer.listen(serverAddress.port, serverAddress.ip);
}

start();