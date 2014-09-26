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

    loadPage: function(url) {
        appActions.startUpdate();

        request(
            { method: 'get', url: url, acceptJson: true },
            function(err, res) {
                var body = res.body;
                var bundle = body.bundle.js;

                if (!err) {
                    window.requireBundle(
                        bundle.path,
                        { key: bundle.key, async: true, version: bundle.version },
                        function() {
                            appStore.setNewInitData(body.data);
                            history.pushState(body.title || document.title, null, url);
                        });
                } else {
                    console.log(err);
                }

                appActions.endUpdate();
            });
    }

};
