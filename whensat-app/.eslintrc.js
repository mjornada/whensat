module.exports = {
	env: {
		node: true,
	},

	extends: ['plugin:vue/essential', 'eslint:recommended', '@vue/prettier'],

	ignorePatterns: ['*.config.js', '{*rc}', '/src/views/routers/'],

	overrides: [
		{
			env: {
				jest: true,
			},
			files: ['*.spec.{j,t}s?(x)'],
		},
	],

	parserOptions: {
		parser: 'babel-eslint',
	},

	plugins: ['vue'],

	root: true,

	rules: {
		'no-console': 'warn',
		'no-const-assign': 'warn',
		'no-debugger': 'off',
		'no-unused-vars': ['warn', { args: 'after-used', vars: 'all' }],
		'vue/array-bracket-spacing': 'warn',
		'vue/arrow-spacing': 'warn',
		'vue/attributes-order': 'warn',
		'vue/block-spacing': 'warn',
		'vue/component-definition-name-casing': ['error', 'kebab-case'],
		'vue/component-name-in-template-casing': [
			'error',
			'kebab-case',
			{
				ignores: [],
				registeredComponentsOnly: false,
			},
		],
		'vue/custom-event-name-casing': [
			'warn',
			'kebab-case',
			{
				ignores: [],
			},
		],
		'vue/html-end-tags': 'error',
		'vue/html-indent': 'off',
		'vue/html-quotes': 'error',
		'vue/html-self-closing': [
			'error',
			{
				html: {
					component: 'never',
					normal: 'never',
					void: 'always',
				},
			},
		],
		'vue/max-len': [
			'warn',
			{
				code: 140,
				comments: 140,
				ignoreComments: true,
				ignoreHTMLAttributeValues: false,
				ignoreHTMLTextContents: false,
				ignorePattern: '',
				ignoreRegExpLiterals: false,
				ignoreStrings: false,
				ignoreTemplateLiterals: false,
				ignoreTrailingComments: false,
				ignoreUrls: true,
				tabWidth: 2,
				template: 140,
			},
		],
		'vue/mustache-interpolation-spacing': 'warn',
		'vue/no-boolean-default': 'warn',
		'vue/no-confusing-v-for-v-if': 'warn',
		'vue/no-dupe-keys': [
			'error',
			{
				groups: [],
			},
		],
		'vue/no-reserved-component-names': [
			'error',
			{
				disallowVueBuiltInComponents: false,
			},
		],
		'vue/no-reserved-keys': [
			'error',
			{
				groups: [],
				reserved: [],
			},
		],
		'vue/no-shared-component-data': 'warn',
		'vue/no-unsupported-features': 'warn',
		'vue/no-unused-components': [
			'warn',
			{
				ignoreWhenBindingPresent: true,
			},
		],
		'vue/no-unused-properties': [
			'warn',
			{
				groups: ['props', 'data', 'computed', 'methods'],
			},
		],
		'vue/no-unused-vars': ['warn'],
		'vue/order-in-components': 'error',
		'vue/prop-name-casing': ['error', 'camelCase'],
		'vue/require-default-prop': 'error',
		'vue/require-prop-types': 'error',
		'vue/require-v-for-key': 'error',
		'vue/singleline-html-element-content-newline': 'off',
		'vue/static-class-names-order': 'warn',
		'vue/this-in-template': 'warn',
		'vue/v-bind-style': 'warn',
		'vue/v-on-style': 'warn',
		'vue/v-slot-style': 'warn',
		'vue/valid-v-slot': ['warn', { allowModifiers: true }],
		'vue/valid-v-bind-sync': 'warn',
	},
}
