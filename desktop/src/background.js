"use strict";

import { app, protocol, BrowserWindow, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
const isDevelopment = process.env.NODE_ENV !== "production";

require("@electron/remote/main").initialize();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{ scheme: "app", privileges: { secure: true, standard: true } }]);

var win;

async function createWindow() {
	// Create the browser window.
	win = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
			contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
			enableRemoteModule: true,
		},
		frame: false,
	});

	if (process.env.WEBPACK_DEV_SERVER_URL) {
		// Load the url of the dev server if in development mode
		await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
	} else {
		createProtocol("app");
		// Load the index.html when not in development
		win.loadURL("app://./index.html");
	}
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
	createWindow();
});

ipcMain.handle("manageWindow", async (event, ...args) => {
	switch (args[0].method) {
		case "MINIMIZE":
			win.minimize();
			break;

		case "MAXIMIZE":
			win.isMaximized() ? win.unmaximize() : win.maximize();
			break;

		case "CLOSE":
			win.close();
			break;
	}
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
	if (process.platform === "win32") {
		process.on("message", (data) => {
			if (data === "graceful-exit") {
				app.quit();
			}
		});
	} else {
		process.on("SIGTERM", () => {
			app.quit();
		});
	}
}
