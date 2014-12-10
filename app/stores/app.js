var Store = { loadingStatus: 0  };

var StoreInterface = require('../../lib/fluxr').StoreInterface;
var CONST = require('../const/actions');

module.exports = new StoreInterface({
    displayName: 'AppStore',

    addListeners: function(add) {
        add(CONST.APP.CHANGE_LOADING_STATUS, function(payload) {
            this.setLoading(payload.val);
        });
    },

    setLoading: function(val) {
        val ?
            ++Store.loadingStatus :
            Store.loadingStatus && --Store.loadingStatus;

        this.emitChange();
    },

    isLoading: function() {
        return !!Store.loadingStatus;
    },

    getInitData: function() {
        return Store.initData;
    }
});
