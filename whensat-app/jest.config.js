const Vue = require('vue')
Vue.config.productionTip = false

module.exports = {
	testTimeout: 30000,
	moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
	transform: {
		'^.+\\.vue$': 'vue-jest',
		'.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
		'^.+\\.jsx?$': 'babel-jest',
	},
	transformIgnorePatterns: ['node_modules/(?!(@azinformatica|vue-radial-progress|swiper)/)'],
	moduleNameMapper: {
		'^@/(.*)$': '<rootDir>/src/$1',
	},
	snapshotSerializers: ['jest-serializer-vue'],
	testMatch: ['**/src/**/*.spec.(js|jsx|ts|tsx)|**/__src__/*.(js|jsx|ts|tsx)'],
	clearMocks: true,
	testURL: 'http://localhost/',
	collectCoverage: true,
	collectCoverageFrom: ['**/*.{js,vue}', '!**/node_modules/**', '!**/index.js'],
	coverageReporters: ['html', 'text-summary', 'lcov'],
	coverageDirectory: '.tmp',
	coveragePathIgnorePatterns: [
		'<rootDir>/src/application/',
		'<rootDir>/src/views/routers/',
		'<rootDir>/src/plugins/',
		'<rootDir>/src/main.js',
		'<rootDir>/vue.config.js',
		'<rootDir>/jest.config.js',
		'<rootDir>/babel.config.js',
	],
}
