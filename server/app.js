var koa = require('koa');
var debug = require('debug')('info');
var app = koa();
var mountPages = require('koa-mount-dir')('pages');
var mountApi = require('koa-mount-dir')('api');
var path = require('path');
var errorView = require('./views/error');
var serve = require('koa-static');

process.env.NODE_ENV = 'development';

if (process.env.NODE_ENV == 'development') {
    debug('Server app: debug mod on');
    app.use(serve('public'));
}

app.use(errorView);

var rnd = require('react-serve').render('../.react', { timeout: 5000 });
var phJsonPath = path.resolve(path.join(__dirname, 'ph.json'));

app.use(function *(next) {
    var self = this;

    this.renderPage = function(entryPointName, ctx) {
        var isJson = self.header.accept === 'application/json';

        console.time('React render');
        self.body = rnd(entryPointName, ctx, isJson, { console: console });
        console.timeEnd('React render');
    };

    yield next;
});

app.use(function *(next) {
    this.jsonPath = phJsonPath;
    yield next;
});


mountPages(app);
mountApi(app);


app.on('error', function(err, ctx) {
    var context = { request: ctx.method + ' ' + ctx.url, header: ctx.header };
    console.log('CRITICAL SERVER ERROR: ', err, 'Context:', context);

    throw err;
});

module.exports = app;

