import colors from 'vuetify/es5/util/colors';

import lt from 'localtunnel';

export default {
	ssr: false,

	target: 'static',

	head: {
		titleTemplate: '%s - Orderify',
		title: 'Orderify',
		htmlAttrs: {
			lang: 'pt-br',
		},
		meta: [
			{ charset: 'utf-8' },
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{ hid: 'description', name: 'description', content: '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},

	css: ['~/assets/helpers.scss'],

	plugins: [
		{
			src: '~/plugins/cookieSession.client.js',
		},
	],

	components: true,

	buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/vuetify'],

	modules: ['@nuxtjs/axios'],

	axios: {},

	vuetify: {
		customVariables: ['~/assets/variables.scss'],
		theme: {
			dark: true,
			themes: {
				dark: {
					primary: colors.blue.darken2,
					accent: colors.grey.darken3,
					secondary: colors.amber.darken3,
					info: colors.teal.lighten1,
					warning: colors.amber.base,
					error: colors.deepOrange.accent4,
					success: colors.green.accent3,
				},
			},
		},
	},

	build: {},

	server: {
		port: 6924,
	},
};

async function startServer() {
	const server = await lt({ port: 6924, subdomain: 'orderify' });
	const serverUrl = server.url;
	console.log(`Nuxt server listening in ${serverUrl}`);
}

startServer();
