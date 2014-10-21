var React = require('react');
var dom = React.DOM;


var Base = require('./base.js');
requireStatic('./islands.styl');

module.exports = React.createClass({
    displayName: 'Islands popup',
    mixins: [Base],
    _view: 'islands',
    render: function() {
        return this._getPopup();
    }
});
