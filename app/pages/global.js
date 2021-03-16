const BrowserWindow = require("@electron/remote");

{
	/* <div class="window-frame">
			<button id="minimizeWindow">
				<img width="16" src="resources/minimize.svg" />
			</button>
			<button id="maximizeWindow">
				<img width="16" style="transform: scaleX(-1)" src="resources/maximize.svg" />
			</button>
			<button id="closeWindow">
				<img width="16" src="resources/close.svg" />
			</button>
		</div> */
}

window.addEventListener("load", () => {
	let windowFrame = document.createElement("div");
	let buttonMinimize = document.createElement("button");
	let buttonMinimizeImg = document.createElement("img");
	let buttonMaximize = document.createElement("button");
	let buttonMaximizeImg = document.createElement("img");
	let buttonClose = document.createElement("button");
	let buttonCloseImg = document.createElement("img");
	let copyrightMark = document.createElement("div");
	windowFrame.setAttribute("class", "window-frame");
	buttonMinimize.setAttribute("id", "minimizeWindow");
	buttonMinimizeImg.setAttribute("width", "16");
	buttonMinimizeImg.setAttribute("src", "resources/minimize.svg");
	buttonMinimize.append(buttonMinimizeImg);
	buttonMaximize.setAttribute("id", "maximizeWindow");
	buttonMaximizeImg.setAttribute("width", "16");
	buttonMaximizeImg.setAttribute("src", "resources/maximize.svg");
	buttonMaximizeImg.setAttribute("style", "transform: scaleX(-1)");
	buttonMaximize.append(buttonMaximizeImg);
	buttonClose.setAttribute("id", "closeWindow");
	buttonCloseImg.setAttribute("width", "16");
	buttonCloseImg.setAttribute("src", "resources/close.svg");
	copyrightMark.setAttribute("class", "copyright");
	copyrightMark.innerHTML = "&copy; FastCoders 2021";
	buttonClose.append(buttonCloseImg);
	windowFrame.append(buttonMinimize);
	windowFrame.append(buttonMaximize);
	windowFrame.append(buttonClose);
	document.querySelector("body").append(windowFrame);
	document.querySelector("body").append(copyrightMark);
	// Functionalities
	buttonMinimize.addEventListener("click", () => {
		let electron_window = BrowserWindow.getCurrentWindow();
		electron_window.minimize();
	});

	buttonMaximize.addEventListener("click", () => {
		let electron_window = BrowserWindow.getCurrentWindow();
		if (electron_window.isMaximized() === true) {
			electron_window.unmaximize();
		} else {
			electron_window.maximize();
		}
	});

	buttonClose.addEventListener("click", () => {
		let electron_window = BrowserWindow.getCurrentWindow();
		electron_window.close();
	});
});

//const closeButton = document.querySelector("#closeWindow");
//
//
//const maximizeButton = document.querySelector("#maximizeWindow");

//
//const minimizeButton = document.querySelector("#minimizeWindow");
