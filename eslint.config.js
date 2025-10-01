import antfu from '@antfu/eslint-config'

export default antfu({
	stylistic: {
		indent: 'tab',
		quotes: 'single',
		semi: false,
		braceStyle: '1tbs',
	},
	formatters: true,
	astro: true,
	typescript: true,
	rules: {
		'node/prefer-global/process': 'off',
		'style/brace-style': ['error', '1tbs', { allowSingleLine: true }],
		'antfu/if-newline': 'off',
	},
})
