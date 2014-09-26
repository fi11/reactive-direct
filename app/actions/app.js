var appStore = require('../stores/app');
var request = require('../../lib/request');

module.exports = {
    startUpdate: function() {
        appStore.setLoading(true);
    },

    endUpdate: function() {
        appStore.setLoading(false);
    }
};
