var page404 = require('../../pages/404');

module.exports = function *errorView(next){
    try {
        yield next;
        if (!this.body) this.throw(404);

    } catch (err) {
        var headers = this.req.headers;

        if (headers['x-requested-with'] !== 'XMLHttpRequest'.toLowerCase() &&
            headers['content-type'] !== 'application/json') {

            if (err.status === 404) {
                yield page404;
            }
        }

        else if (err.status && err.status < 500) {
            this.status = err.status;
        }

        else {
            this.status = err.status ? err.status : 500;
            this.app.emit('error', err, this);
        }
    }
};
