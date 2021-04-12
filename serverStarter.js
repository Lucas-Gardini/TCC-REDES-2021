const host = require("./server/node_modules/localtunnel");

async function start() {
	const server = await host({ port: 8080, subdomain: "api-orderify" });
	const websocket = await host({ port: 8081, subdomain: "ws-orderify" });
	const mobile = await host({ port: 6924, subdomain: "app-orderify" });

	const server_url = server.url;
	const websocket_url = websocket.url;
	const mobile_url = mobile.url;

	console.log("-----------------------------");
	console.log(` 🛅 Server hosting in ${server_url}`);
	console.log(` 🔌 WebSocket hosting in ${websocket_url}`);
	console.log(` 📱 Nuxt server listening in ${mobile_url}`);
	console.log("-----------------------------");
}

start();
