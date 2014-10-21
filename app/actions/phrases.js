var phraseStore = require('../stores/phrases');
var appStore = require('../stores/app');
var Phrases = require('../../components/phrases');

var request = require('../../lib/request');

module.exports = {
    changePrice: function(id, price) {
        phraseStore.setPrice(id, price);
    },

    changePhrase: function(id, val) {
        phraseStore.setPhrase(id, val);
    },

    changePhraseDescr: function(id, val) {
        phraseStore.setPhraseDescr(id, val);
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
    },

    saveAllPhrases: function() {
        phraseStore.getAll();

        request({ method: 'post', url: '/api/phrases/', json: true, data: phraseStore.getAll() })
    }

};
