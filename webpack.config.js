var path = require('path');
var CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
var STATIC_LOADER = path.resolve(path.join(__dirname, 'lib', 'static-loader'));
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        morda: './app/entrypoints/morda.js',
        phrases: './app/entrypoints/phrases.js'
    },
    output: {
        path: 'public/static',
        publicPath: '/static/',
        filename: '[chunkhash].js' // Template based on keys in entry above
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: STATIC_LOADER },
            //{ test: /\.styl$/, loader: 'style!css!stylus' },
            //{ test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader', 'stylus-loader') }
            { test: /\.styl$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader!stylus-loader') }
            , { test: /\.svg$/, loader: 'url' }
            , { test: /\.png$/, loader: 'file' }
        ]
    },
    stylus: {
        use: [require('./lib/stylus-plugin.js')(), require('autoprefixer-stylus')()]
    },
    plugins: [
        new CommonsChunkPlugin('commons', '[chunkhash].js'),
        new ExtractTextPlugin('[chunkhash].css'),
        function() {
            this.plugin("done", function(stats) {
                var data = stats.toJson().assetsByChunkName;

                Object.keys(data).forEach(function(key) {
                    data[key] = [].concat(data[key] || []);
                });

                require("fs").writeFileSync(
                    path.join(__dirname, "server", "static-bundle.json"),
                    JSON.stringify(data));
            });
        }
    ]
};
