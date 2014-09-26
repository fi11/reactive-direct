(function(window, document) {

'use strict';

function getResource(url, options, done) {
    var xhr = new XMLHttpRequest();

    options = options || {};

    xhr.open('GET', url, !!options.async);

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                done(null, xhr.responseText);
            } else {
                done(new Error('Bad response status'));
            }

            clearTimeout(this._timeout);
        }
    };

    xhr.onerror = function(err) {
        done(err);
    };

    xhr._timeout = setTimeout(function() {
        if (xhr.readyState < 4)  {
            xhr.abort();
            done(new Error('XMLHttpRequest timeout'));
        }
    }, options.timeout || 5000);

    xhr.send();
}


var head = document.head || document.getElementsByTagName('head')[0];
var loaded = {};

function injectScript(id, data, defer) {
    if (!loaded[id]) {
        var script = loaded[id] = document.createElement('script');

        script.defer = !!defer;
        script.text = data;
        head.appendChild(script);
    }

    return loaded[id];
}


window.requireBundle = function require(resource, options, done) {
    options = options || {};

    var script;
    var now = +(new Date());
    var key = options.key || resource;
    var version = options.version || null;  //TODO: get version from resource

    var item = getItem(key);

    if (!options.noCache && item && item.version === version &&
        (item.expire === 0 || item.expire + item.timestamp > now)) {

        script = injectScript(key + version, item.data, options.defer);
        done && done(null, script);

    } else {
        removeItem(key);
        getResource(resource, { async: options.async }, function(err, res) {
            if (!err) {
                if (!options.noCache)
                    setItem(key, { timestamp: now, expire: options.expire || 0, version: version, data: res });

                script = injectScript(key + version, res, options.defer);
                done && done(null, script);
            } else {
                done && done(err);
            }
        });
    }
};

var ls = null;

try {
    ls = window.localStorage;
} catch(e) {
    // Chrome throws exception if cookie is disabled
}


function setItem(key, data) {
    data = JSON.stringify(data);

    try {
        ls.setItem(key, data);

        return true;
    } catch (e) {
        // iPad workaround
        if (removeItem(key)) {
            try {
                ls.setItem(key, data);

                return true;
            } catch(e) {
            }
        }
        // throw exceptions frequently
    }

    return false;
}


function getItem(key) {
    try {
        return JSON.parse(ls.getItem(key));
    } catch (e) {
        // throw exceptions frequently
    }

    return null;
}

function removeItem(key) {
    try {
        ls.removeItem(key);
        return true;
    } catch(e) {
        // throw exceptions frequently
    }

    return false;
}


})(this, document);
