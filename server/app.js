var koa = require('koa');
var debug = require('debug')('info');
var app = koa();
var mountPages = require('koa-mount-dir')('pages');
var path = require('path');
var send = require('koa-send');
var errorView = require('./views/error');

var staticBundles = require('./static-bundle.json');

global.requireStatic = function() {};

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV == 'development') {
//if (true) {
    debug('Server app: debug mod on');

    //TODO: remove to npm lib
    app.use(function *(next) {
        var files = ['/robots.txt', '/humans.txt', '/favicon.ico', '/jquery-1.11.1.js', '/react.js'];

        if (/^\/static\//.test(this.path) || /^\/media\//.test(this.path) || ~files.indexOf(this.path)) {
            yield send(this, this.path, { root: path.resolve('public') });
        }

        if (this.path === '/main.js') {
            yield send(this, this.path, { root: path.resolve('js') });
        }

        yield next;
    });
}

var React = require('react');
var Page = require('../components/page');

app.render = function(entrypoin, ctx) {
    ctx = ctx || {};

    try {
        var html = React.renderComponentToStaticMarkup(
            Page({ staticBundles: staticBundles, entrypoint: entrypoin, context: ctx }));
    } catch (err) {
        console.log('RENDER ERROR:', err);
    }

    return html;
};

var phJsonPath = path.resolve(path.join(__dirname, 'ph.json'));

app.use(function *(next) {
    this.jsonPath = phJsonPath;
    yield next;
});

app.use(errorView);
mountPages(app);

app.on('error', function(err, ctx) {
    var context = { request: ctx.method + ' ' + ctx.url, header: ctx.header };
    console.log('SERVER ERROR: ', err, 'Context:', context);

    throw err;
});

module.exports = app;

