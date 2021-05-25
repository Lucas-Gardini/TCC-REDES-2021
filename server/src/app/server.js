const networkSelector = require("./utils/networkSelector");
const httpServer = require("http").createServer();
const websocket = require("ws");
const { expressServer } = require("./utils/express");

async function start() {
	const serverAddress = await networkSelector.select();
	const server = new expressServer().start();

	const ws = new websocket.Server({
		server: httpServer,
	});

	ws.on("connection", () => {
		console.log("ass");
	});

	httpServer.on("request", server);
	httpServer.listen(serverAddress.port, serverAddress.ip);
}

start();
