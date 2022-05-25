const path = require("path")

module.exports = {
    publicPath: '/projeto/',
    outputDir: path.resolve(__dirname, 'app'),
    devServer: {
        proxy: {
            '/': {
                target: 'http://172.17.0.1',
                changeOrigin: true,
                secure: false,
                logLevel: 'debug'
            }
        }
    }
}
