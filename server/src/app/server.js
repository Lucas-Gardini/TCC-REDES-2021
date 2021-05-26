const baianisse = require("chalk");
const networkSelector = require("./utils/networkSelector");
const httpServer = require("http").createServer();
const websocket = require("ws");
const { expressServer } = require("./utils/express");
const { mongoDB } = require("./utils/mongo");

async function start() {
	const serverAddress = await networkSelector.select();
	const server = new expressServer().start();

	const ws = new websocket.Server({
		server: httpServer,
	});

	ws.on("listening", () => {
		console.log(
			baianisse.bgCyan(
				`Websocket Iniciado no endereço: ws://${serverAddress.ip}:${serverAddress.port}`
			)
		);
	});

	new mongoDB(ws);

	httpServer.on("request", server);
	httpServer.listen(serverAddress.port, serverAddress.ip);
}

start();
