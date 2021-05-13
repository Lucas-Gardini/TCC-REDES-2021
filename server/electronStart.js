const { app, BrowserWindow, session } = require("electron");
const { default: installExtension, VUEJS_DEVTOOLS } = require("electron-devtools-installer");

const path = require("path");

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		darkTheme: true,
	});

	win.removeMenu();
	win.loadFile("index.html");
}

app.whenReady().then(async () => {
	// try {
	// 	await installExtension(VUEJS_DEVTOOLS);
	// } catch (e) {
	// 	console.error("Vue Devtools failed to install:", e.toString());
	// }
	createWindow();

	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});
