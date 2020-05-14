module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/essential', '@vue/prettier'],
	rules: {
		'no-console': 'off'
	},
	parserOptions: {
		parser: '@typescript-eslint/parser'
	}
};
