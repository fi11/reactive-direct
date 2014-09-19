var React = require('react');
var dom = React.DOM;

var Base = require('./base');
requireStatic('./islands.styl');

module.exports = React.createClass({
    displayName: 'Service arrow islands',
    mixins: [Base],
    _view: 'islands',
    render: function() {
        return this._getArrow();
    }
});
