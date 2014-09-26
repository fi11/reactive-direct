module.exports = function request(params, fn, ctx) {
    ctx = ctx || window;

    var xhr = new XMLHttpRequest();
    var async = params.async === undefined ? true : params.async;

    xhr.open(params.method.toUpperCase(), params.url, async);
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
    xhr.setRequestHeader('Content-type', params.json ? 'application/json' : 'application/x-www-form-urlencoded');
    params.acceptJson && xhr.setRequestHeader('Accept', 'application/json');

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            var result = {
                body: params.acceptJson ? JSON.parse(xhr.responseText) : xhr.responseText,
                type: xhr.getResponseHeader('content-type'),
                status: xhr.status
            };

            clearTimeout(this._timeout);
            fn && fn.call(ctx, null, result);
        }
    };

    xhr.onerror = function(err) {
        fn && fn.call(ctx, err);
    };

    xhr._timeout = setTimeout(function() {
        if (xhr.readyState < 4)  {
            xhr.abort();
            fn && fn.call(ctx, new Error('XMLHttpRequest timeout'));
        }
    }, params.timeout || 5000);

    xhr.send();

    return xhr;
};

