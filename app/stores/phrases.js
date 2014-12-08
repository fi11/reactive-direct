var Store = {};
var EventEmitter = require('eventemitter3');
var merge = require('react/lib/merge');
var request = require('../../lib/request');

var chan = new EventEmitter();

module.exports = {
    setPrice: function(id, price) {
        if (!Store[id]) Store[id] = {};

        Store[id].price =  price;
        chan.emit('change');
    },

    setPhrase: function(id, val) {
        if (!Store[id]) Store[id] = {};

        Store[id].phrase =  val;
        chan.emit('change');
    },

    setPhraseDescr: function(id, val) {
        if (!Store[id]) Store[id] = {};

        Store[id].descr =  val;
        chan.emit('change');
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

        chan.emit('change');
    },

    checkAll: function(val) {
        Object.keys(Store).forEach(function(id) {
            Store[id].checked = !!val;
        });

        chan.emit('change');
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

        chan.emit('change');
    },

    isAllChecked: function() {
        var keys = Object.keys(Store);
        return !!keys.length && keys.every(function(id) {
            return !!Store[id].checked;
        });
    },

    update: function(data) {
        console.time('Phrase update');
        //
        //(data || []).forEach(function(item) {
        //    Store[item.id] = this.prepareEntry(item);
        //}, this);

        this.init(data);

        console.timeEnd('Phrase update');

        chan.emit('change');
    },

    prepareEntry: function(item) {
        item = Object.create(item);

        item.checked = !!(Store[item.id] || {}).checked;

        return item;
    },

    addChangeListener: function(fn, ctx) {
        chan.on('change', fn, ctx || this);
    },

    removeChangeListener: function(fn) {
        chan.off('change', fn);
    }
};
