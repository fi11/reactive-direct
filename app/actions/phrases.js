var phraseStore = require('../stores/phrases');
var request = require('../../lib/request');
var PhrasesActionInterface = require('../../lib/fluxr').actionInterface;

var CONST = require('../const/actions');

module.exports = new PhrasesActionInterface({
    displayName: 'PhrasesAction',

    changePrice: function(id, price) {
        this.dispatch(CONST.PHRASES.CHANGE_PRICE, { id: id, price: price });
    },

    changePhrase: function(id, val) {
        this.dispatch(CONST.PHRASES.CHANGE_PHRASE, { id: id, val: val });
    },

    changePhraseDescr: function(id, val) {
        this.dispatch(CONST.PHRASES.CHANGE_DESCR, { id: id, val: val });

    },

    check: function(id, val) {
        this.dispatch(CONST.PHRASES.CHECK, { id: id, val: val });
    },

    checkAll: function(val) {
        this.startUpdate();

        setTimeout(function() {
            this.dispatch(CONST.PHRASES.CHECK_ALL, { val: val });
        }.bind(this), 0);
    },

    startUpdate: function() {
        this.dispatch(CONST.APP.CHANGE_LOADING_STATUS, { val: true });
    },

    endUpdate: function() {
        this.dispatch(CONST.APP.CHANGE_LOADING_STATUS, { val: false });
    },

    setState: function(val) {
        this.startUpdate();
        setTimeout(function() {
            this.dispatch(CONST.PHRASES.CHANGE_PHRASE_STATE, { val: val });
        }, 0);
    },

    saveAllPhrases: function() {
        phraseStore.getAll();

        request({ method: 'post', url: '/api/phrases/', json: true, data: phraseStore.getAll() })
    },

    loadAll: function() {
        var self = this;

        this.startUpdate();

        history.pushState(null, null, '/phrases/all/');

        request(
            { method: 'get', url: '/api/phrases/?limit=all', acceptJson: true },
            function(err, res) {
                var body = res.body;

                if (!err) {
                    self.dispatch(CONST.PHRASES.UPDATE_STORE, { data: body.phrases });

                    //hraseStore.update(body.phrases);
                } else {
                    console.log(err);
                }

                self.endUpdate();
            });
    }

});
