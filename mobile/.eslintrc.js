module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parserOptions: {
		parser: 'babel-eslint',
	},
	extends: [
		'@nuxtjs',
		'plugin:prettier/recommended',
		'plugin:nuxt/recommended',
		'prettier',
	],
	plugins: ['prettier'],
	// add your custom rules here
	rules: {
		'no-console': 'off',
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
			{
				usePrettierrc: true,
			},
		],
	},
}
