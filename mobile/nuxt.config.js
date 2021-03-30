import colors from 'vuetify/es5/util/colors'

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

	css: [],

	plugins: [],

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
}
