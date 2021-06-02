module.exports = {
	pluginOptions: {
		electronBuilder: {
			nodeIntegration: true,
			builderOptions: {
				appId: "com.desktop.orderify",
				win: {
					icon: "src/assets/icon.png",
				},
			},
		},
	},
};
