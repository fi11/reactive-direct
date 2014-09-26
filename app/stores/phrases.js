var Store = {};
var EventEmitter = require('eventemitter3');
var merge = require('react/lib/merge');

var chan = new EventEmitter();

module.exports = {
    setPrice: function(id, price) {
        if (!Store[id]) Store[id] = {};

        Store[id].price =  price;
        chan.emit('change');
    },

    getAll: function() {
        return Object.keys(Store).map(function(id) {
            return Store[id];
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
        var phrases = {};

        (data || []).forEach(function(item) {
            phrases[item.id] = this.prepareEntry(item);
        }, this);

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
        this.init(data);
        
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
