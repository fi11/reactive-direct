var Store = { loading: false  };
var EventEmitter = require('eventemitter3');

var chan = new EventEmitter();

module.exports = {
    setLoading: function(val) {
        Store.loading = val;
        chan.emit('change');
    },

    isLoading: function() {
        return Store.loading;
    },

    setEntrypoint: function(val) {
        Store.entrypoint = val;
        chan.emit('change');
    },

    setNewInitData: function(data) {
        Store.initData = Object.create(data || {});
        chan.emit('init');
    },

    getInitData: function() {
        return Store.initData;
    },

    addChangeListener: function(fn, ctx) {
        chan.on('change', fn, ctx || this);
    },

    removeChangeListener: function(fn) {
        chan.off('change', fn);
    },

    addInitListener: function(fn, ctx) {
        chan.on('init', fn, ctx || this);
    },

    removeInitListener: function(fn) {
        chan.off('init', fn);
    }
};
