var path = require('path');
var wp = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var reactServe = require('react-serve');
var COMMON_FILE_NAME = 'commons';

var entry = reactServe.mount(['morda', 'phrases'], { commonFileName: COMMON_FILE_NAME });

module.exports = [
    {
        name: "client-side",
        entry: entry,
        target: 'web',
        output: {
            path: 'public/static',
            publicPath: '/static/',
            filename: '[chunkhash].js'
        },
        module: {
            loaders: [
                { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') }
                , { test: /\.svg$/, loader: 'url' }
                , { test: /\.png$/, loader: 'file' }
            ]
        },
        stylus: {
            use: [require('./lib/stylus-plugin.js')(), require('autoprefixer-stylus')()]
        },
        plugins: [
            new wp.optimize.CommonsChunkPlugin(COMMON_FILE_NAME, '[chunkhash].js'),
            new ExtractTextPlugin('[chunkhash].css'),
            reactServe.webpackPlugin('/static/'),
            new wp.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('development')
                }
            })
        ]
    },
    {
        name: 'server-side rendering',
        entry: './.react/main.js',
        output: {
            path: 'public/static',
            publicPath: '/static/',
            filename: '../../.react/server-render.js',
            pathinfo: true,
            library: 'Render',
            libraryTarget: "var"
        },
        node: {
            process: 'mock',
            global: true
        },
        module: {
            loaders: [
                { test: /\.styl$/, loader: 'null' },
                { test: /\.svg$/, loader: 'url' },
                { test: /\.png$/, loader: 'file' },
                { test: /\.json$/, loader: 'json' }
            ]
        }
    }
];
