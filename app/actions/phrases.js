var phraseStore = require('../stores/phrases');
var appStore = require('../stores/app');
var Phrases = require('../../components/phrases');

var request = require('../../lib/request');

module.exports = {
    changePrice: function(id, price) {
        phraseStore.setPrice(id, price);
    },

    check: function(id, val) {
        phraseStore.check(id, val);
    },

    checkAll: function(val) {
        this.startUpdate();
        setTimeout(function() { phraseStore.checkAll(val); }, 0);
    },

    startUpdate: function() {
        appStore.setLoading(true);
    },

    endUpdate: function() {
        appStore.setLoading(false);
    },

    setState: function(val) {
        this.startUpdate();
        setTimeout(function() { phraseStore.setStateForActive(val) }, 0);
    }

};