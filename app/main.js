const { app, BrowserWindow } = require("electron");
require("@electron/remote/main").initialize();

function createWindow() {
	const win = new BrowserWindow({
		width: 800,
		height: 600,
		frame: false,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});

	// Desabilitar o "Dev Tools"
	// win.webContents.on("devtools-opened", () => {
	// 	win.webContents.closeDevTools();
	// });

	win.loadFile("pages/index.html");
}

app.on("ready", () => createWindow());

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
