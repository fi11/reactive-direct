var path = require('path');
var CommonsChunkPlugin = require('webpack').optimize.CommonsChunkPlugin;
var STATIC_LOADER = path.resolve(path.join(__dirname, 'lib', 'static-loader'));

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
            { test: /\.styl$/, loader: 'style!css!stylus' }
            , { test: /\.svg$/, loader: 'url' }
            , { test: /\.png$/, loader: 'file' }
        ]
    },
    stylus: {
        use: [require('./lib/stylus-plugin.js')(), require('autoprefixer-stylus')()]
    },
    plugins: [
        new CommonsChunkPlugin('commons', '[chunkhash].js'),
        function() {
            this.plugin("done", function(stats) {
                require("fs").writeFileSync(
                    path.join(__dirname, "server", "static-bundle.json"),
                    JSON.stringify(stats.toJson().assetsByChunkName));
            });
        }
    ]
};
