import path from 'path'
import webpack from 'webpack'
import process from 'process'

const isProduction = (process.env.NODE_ENV === 'production')

let config = {

    entry: './js/main.js',

    output: {
        filename: './js/bundle.js',
        path: path.resolve(__dirname, './../assets')
    },

    context: path.resolve(__dirname, './../assets'),

    plugins: isProduction ? [new webpack.optimize.UglifyJsPlugin()] : []
}


function scripts() {
    return new Promise(resolve => webpack(config, (err, stats) => {

        if (err) console.log('Webpack', err)

        console.log(stats.toString({ /* stats options */ }))

        resolve()
    }))
}

module.exports = { config, scripts }