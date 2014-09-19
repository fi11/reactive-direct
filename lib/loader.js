(function(window, document) {
    'use strict';

    var head = document.head || document.getElementsByTagName('head')[0];

    function request(method, url, fn, options) {
        options = options || {};
        var xhr = new XMLHttpRequest();

        xhr.open(method.toUpperCase(), url, !!options.async);

        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                fn(null, { body: xhr.responseText, type: xhr.getResponseHeader('content-type'), status: xhr.status });
            }
        };

        setTimeout(function() {
            if (xhr.readyState < 4) xhr.abort();
        }, options.timeout || 5000);

        xhr.send();
    }

    function injectScript(data) {
        var script = document.createElement('script');

        script.text = data;
        head.appendChild(script);
    }

    window.staticLoader  = function(resource) {
        request('GET', resource, function(err, res) {
        if (res.status === 200 && res.body) {
            injectScript(res.body);
        }
    });
    }
})( this, document );
