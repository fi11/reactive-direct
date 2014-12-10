var Store = {};

var PhrasesStoreInterface = require('../../lib/fluxr').StoreInterface;
var CONST = require('../const/actions');

module.exports = new PhrasesStoreInterface({
    displayName: 'PhrasesStore',

    addListeners: function(add) {
        add(CONST.PHRASES.CHANGE_PRICE, function(payload) {
            this.setPrice(payload.id, payload.price);
        });

        add(CONST.PHRASES.CHANGE_PHRASE, function(payload) {
            this.setPhrase(payload.id, payload.val);
        });

        add(CONST.PHRASES.CHANGE_DESCR, function(payload) {
            this.setPhraseDescr(payload.id, payload.val)
        });

        add(CONST.PHRASES.CHECK, function(payload) {
            this.check(payload.id, payload.val);
        });

        add(CONST.PHRASES.CHECK_ALL, function(payload) {
            this.checkAll(payload.val);
        });

        add(CONST.PHRASES.UPDATE_STORE, function(payload) {
            this.update(payload.data);
        });

        add(CONST.PHRASES.INIT_STORE, function(payload) {
            this.init(payload.data);
        });

        add(CONST.PHRASES.CHANGE_PHRASE_STATE, function(payload) {
            this.setStateForActive(payload.val)
        });
    },

    setPrice: function(id, price) {
        if (!Store[id]) Store[id] = {};

        Store[id].price =  price;
        this.emitChange();
    },

    setPhrase: function(id, val) {
        if (!Store[id]) Store[id] = {};

        Store[id].phrase =  val;
        this.emitChange();
    },

    setPhraseDescr: function(id, val) {
        if (!Store[id]) Store[id] = {};

        Store[id].descr =  val;
        this.emitChange();
    },

    getDescr: function(id) {
        return Store[id] && Store[id].descr || '...';
    },

    getAll: function() {
        return Object.keys(Store).map(function(id) {
            var data = Store[id];

            data.id = id;

            return data;
        });
    },

    check: function(id, val) {
        Store[id].checked = !!val;
        this.emitChange();
    },

    checkAll: function(val) {
        Object.keys(Store).forEach(function(id) {
            Store[id].checked = !!val;
        });

        this.emitChange();
    },

    init: function(data) {
        console.time('Phrase init');
        var phrases = {};

        (data || []).forEach(function(item) {
            phrases[item.id] = this.prepareEntry(item);
        }, this);

        console.timeEnd('Phrase init');
        Store = phrases;
    },

    setStateForActive: function(val) {
        (Object.keys(Store) || []).forEach(function(id) {
            var item = Store[id];
            if (item.checked) {
                item.state = val ? 'on' : 'off';
            }
        }, this);

        this.emitChange();
    },

    isAllChecked: function() {
        var keys = Object.keys(Store);
        return !!keys.length && keys.every(function(id) {
            return !!Store[id].checked;
        });
    },

    update: function(data) {
        console.time('Phrase update');

        this.init(data);

        console.timeEnd('Phrase update');

        this.emitChange();
    },

    prepareEntry: function(item) {
        item = Object.create(item);

        item.checked = !!(Store[item.id] || {}).checked;

        return item;
    }
});
