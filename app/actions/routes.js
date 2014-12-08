var appActions = require('../actions/app');
var appStore = require('../stores/app');
var request = require('../../lib/request');

module.exports = {
    loadAllPhrases: function() {
        this.loadPage('/phrases/all/');
    },

    loadPhrases: function() {
        this.loadPage('/phrases/');
    },

    loadMorda: function() {
        this.loadPage('/');
    },

    loadPage: function(url, onpopstate) {
        appActions.startUpdate();
        console.log('Load page ...');
        request(
            { method: 'get', url: url, acceptJson: true },
            function(err, res) {
                console.log('Load page:', url, res.status);

                var body = res.body;

                if (!err) {
                    window._sharedData = body.data;
                    onpopstate || history.pushState(body.title || document.title, null, url);

                    [].concat(body.bundles || []).forEach(function(item, idx) {
                        console.log('Require bucket', item.params.key, item.path, idx);

                        bucket.require(item.path, item.params, function() {
                            console.log('Bucket required', item.params.key, item.path, idx);
                        });
                    });
                } else {
                    console.log(err);
                }

                appActions.endUpdate();
            });
    }
};
