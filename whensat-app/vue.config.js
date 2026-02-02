const path = require('path')

module.exports = {
	publicPath: '/projeto/',
	outputDir: path.resolve(__dirname, 'app'),
	devServer: {
		host: '172.17.0.1',
		port: '8070',
		proxy: {
			'/': {
				target: 'http://172.17.0.1',
				changeOrigin: true,
				secure: false,
			},
		},
	},
}
