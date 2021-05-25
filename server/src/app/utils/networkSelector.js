const baianisse = require("chalk");
const textoComBaianisse = require("figlet");
const stdout = process.stdout;
const stdin = process.stdin;
const stderr = process.stderr;
const readline = require("readline");

const { networkInterfaces } = require("os");

// Select network interface

const nets = networkInterfaces();
const results = Object.create(null);

function select() {
	return new Promise((resolve) => {
		for (const name of Object.keys(nets)) {
			for (const net of nets[name]) {
				// Skip over non-IPv4 and internal (i.e. 127.0.0.1) addresses
				if (net.family === "IPv4" && !net.internal) {
					if (!results[name]) {
						results[name] = [];
					}
					results[name].push(net.address);
				}
			}
		}

		textoComBaianisse("ORDERIFY", async (err, data) => {
			if (err) {
				console.log(err);
				return;
			}
			console.log(baianisse.green(data));
			resolve(await getNetworkInterface());
		});
	});
}

async function getNetworkInterface() {
	const input = readline.createInterface({
		input: stdin,
		output: stdout,
	});

	function selectNetworkInterface() {
		return new Promise((resolve, reject) => {
			console.log(baianisse.black.bgGreen("Interfaces de Rede Disponíveis"));
			for (const networkName in results) {
				console.log(
					`${Object.keys(results).indexOf(networkName) + 1} ${networkName} - ${
						results[networkName]
					}`
				);
			}
			console.log("\n");
			return input.question("Qual endereço da rede será utilizado?: ", (answer) => {
				answer = Number(answer);
				if (isNaN(answer)) {
					console.clear();
					console.log(baianisse.red("O valor informado não é um número!\n"));
					resolve(false);
				} else if (answer > Object.keys(results).length) {
					console.clear();
					console.log(baianisse.red("Digite um valor menor!\n"));
					resolve(false);
				} else if (answer < 1) {
					console.clear();
					console.log(baianisse.red("Digite um valor maior\n"));
					resolve(false);
				} else {
					resolve(answer);
				}
			});
		});
	}

	let networkInterface;
	while (!networkInterface) {
		networkInterface = await selectNetworkInterface();
	}

	async function selectNetworkPort() {
		return new Promise((resolve) => {
			input.question("Qual porta será utilizada?: ", (answer) => {
				answer = Number(answer);
				if (isNaN(answer)) {
					console.clear();
					console.log(baianisse.red("O valor informado não é um número!\n"));
				} else {
					resolve(answer);
				}
			});
		});
	}

	return {
		ip: results[Object.keys(results)[networkInterface - 1]][0],
		port: await selectNetworkPort(),
	};
}

module.exports = { select };
