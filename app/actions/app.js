var CONST = require('../const/actions');
var AppActionInterface = require('../../lib/fluxr').actionInterface;

module.exports = new AppActionInterface({
    displayName: 'AppAction',

    startUpdate: function() {
        this.dispatch(CONST.APP.CHANGE_LOADING_STATUS, { val: true });
    },

    endUpdate: function() {
        this.dispatch(CONST.APP.CHANGE_LOADING_STATUS, { val: false });
    }
});
